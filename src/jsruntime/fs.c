/*
 * txiki.js
 *
 * Copyright (c) 2019-present Saúl Ibarra Corretgé <s@saghul.net>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include "sjs.h"

static JSClassID SJSFileClassID;

typedef struct {
    JSContext* ctx;
    uv_file fd;
    JSValue path;
} SJSFile;

typedef struct {
    JSContext *ctx;
    uv_fs_event_t event;
    JSValue event_func;
    char *filename;
} SJSFsWatch;

static void SJSFileFinalizer(JSRuntime *rt, JSValue val) {
    SJSFile *f = JS_GetOpaque(val, SJSFileClassID);
    if (f) {
        if (f->fd != -1) {
            uv_fs_t req;
            uv_fs_close(NULL, &req, f->fd, NULL);
            uv_fs_req_cleanup(&req);
        }
        JS_FreeValueRT(rt, f->path);
        js_free_rt(rt, f);
    }
}

static JSClassDef SJSFileClass = {
    "File",
    .finalizer = SJSFileFinalizer,
};

static JSClassID SJSDirClassID;

typedef struct {
    JSContext* ctx;
    uv_dir_t *dir;
    uv_dirent_t dirent; // TODO: Use an array and an index.
    JSValue path;
    BOOL done;
} SJSDir;

static void SJSDirFinalizer(JSRuntime *rt, JSValue val) {
    SJSDir *d = JS_GetOpaque(val, SJSDirClassID);
    if (d) {
        if (d->dir) {
            uv_fs_t req;
            uv_fs_closedir(NULL, &req, d->dir, NULL);
            uv_fs_req_cleanup(&req);
        }
        JS_FreeValueRT(rt, d->path);
        js_free_rt(rt, d);
    }
}

static JSClassDef SJSDirClass = { "Directory", .finalizer = SJSDirFinalizer };

static JSClassID SJSDirentClassID;

typedef struct {
    JSValue name;
    uv_dirent_type_t type;
} SJSDirEnt;

static void SJSDirentFinalizer(JSRuntime *rt, JSValue val) {
    SJSDirEnt *de = JS_GetOpaque(val, SJSDirentClassID);
    if (de) {
        JS_FreeValueRT(rt, de->name);
        js_free_rt(rt, de);
    }
}

static JSClassDef SJSDirentClass = { "DirEnt", .finalizer = SJSDirentFinalizer };

static JSClassID SJSStatClassID;

typedef struct {
    uint64_t st_mode;
} SJSStatResult;

static void SJSStatFinalizer(JSRuntime *rt, JSValue val) {
    SJSStatResult *sr = JS_GetOpaque(val, SJSStatClassID);
    if (sr) {
        js_free_rt(rt, sr);
    }
}

static JSClassDef SJSStatClass = { "StatResult", .finalizer = SJSStatFinalizer };

typedef struct {
    uv_fs_t req;
    JSContext* ctx;
    JSValue obj;
    SJSPromise result;
    struct {
        JSValue tarray;
    } rw;
    int is_sync;
    BOOL is_reject;
    JSValue sync_result;
} SJSFsReq;

typedef struct {
    uv_work_t req;
    DynBuf dbuf;
    JSContext* ctx;
    int r;
    char* filename;
    SJSPromise result;
    int is_sync;
    BOOL is_reject;
    JSValue sync_result;
    int isBinary;
} SJSReadFileReq;

typedef struct {
    uv_work_t req;
    JSContext* ctx;
    int r;
    char* filename;
    char* buf;
    SJSPromise result;
    int is_sync;
    BOOL is_reject;
    size_t len;
    JSValue sync_result;
} SJSWriteFileReq;

static JSValue SJSNewFile(JSContext* ctx, uv_file fd, const char *path) {
    SJSFile *f;
    JSValue obj;

    obj = JS_NewObjectClass(ctx, SJSFileClassID);
    if (JS_IsException(obj))
        return obj;

    f = js_malloc(ctx, sizeof(*f));
    if (!f) {
        JS_FreeValue(ctx, obj);
        return JS_EXCEPTION;
    }

    f->path = JS_NewString(ctx, path);
    f->ctx = ctx;
    f->fd = fd;

    JS_SetOpaque(obj, f);
    return obj;
}

static SJSFile *SJSFileGet(JSContext* ctx, JSValueConst obj) {
    return JS_GetOpaque2(ctx, obj, SJSFileClassID);
}

static JSValue SJSNewDir(JSContext* ctx, uv_dir_t *dir, const char *path) {
    SJSDir *d;
    JSValue obj;

    obj = JS_NewObjectClass(ctx, SJSDirClassID);
    if (JS_IsException(obj))
        return obj;

    d = js_malloc(ctx, sizeof(*d));
    if (!d) {
        JS_FreeValue(ctx, obj);
        return JS_EXCEPTION;
    }

    d->path = JS_NewString(ctx, path);
    d->ctx = ctx;
    d->dir = dir;
    d->done = FALSE;

    JS_SetOpaque(obj, d);
    return obj;
}

static SJSDir *SJSDirGet(JSContext* ctx, JSValueConst obj) {
    return JS_GetOpaque2(ctx, obj, SJSDirClassID);
}

static JSValue SJSNewDirent(JSContext* ctx, uv_dirent_t *dent) {
    JSValue obj = JS_NewObjectClass(ctx, SJSDirentClassID);
    if (JS_IsException(obj))
        return obj;

    SJSDirEnt *de = js_malloc(ctx, sizeof(*de));
    if (!de) {
        JS_FreeValue(ctx, obj);
        return JS_EXCEPTION;
    }

    de->name = JS_NewString(ctx, dent->name);
    de->type = dent->type;

    JS_SetOpaque(obj, de);
    return obj;
}

static SJSDirEnt *SJSDirentGet(JSContext* ctx, JSValueConst obj) {
    return JS_GetOpaque2(ctx, obj, SJSDirentClassID);
}

static JSValue SJSNewStat(JSContext* ctx, uv_stat_t *st) {
    // JSValue obj = JS_NewObjectClass(ctx, SJSStatClassID);
    // if (JS_IsException(obj))
    //     return obj;

    // SJSStatResult *sr = js_malloc(ctx, sizeof(*sr));
    // if (!sr) {
    //     JS_FreeValue(ctx, obj);
    //     return JS_EXCEPTION;
    // }

    // sr->st_mode = st->st_mode;

    // JS_SetOpaque(obj, sr);
    // return obj;

    int err = 0;
    JSValue obj = JS_NewObject(ctx);
    if (JS_IsException(obj))
        return JS_EXCEPTION;
    JS_DefinePropertyValueStr(ctx, obj, "dev",
                                JS_NewInt64(ctx, st->st_dev),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "ino",
                                JS_NewInt64(ctx, st->st_ino),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "mode",
                                JS_NewInt32(ctx, st->st_mode),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "nlink",
                                JS_NewInt64(ctx, st->st_nlink),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "uid",
                                JS_NewInt64(ctx, st->st_uid),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "gid",
                                JS_NewInt64(ctx, st->st_gid),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "rdev",
                                JS_NewInt64(ctx, st->st_rdev),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "size",
                                JS_NewInt64(ctx, st->st_size),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "blocks",
                                JS_NewInt64(ctx, st->st_blocks),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "atime",
                                JS_NewInt64(ctx, (int64_t)st->st_atim.tv_sec * 1000 + (int64_t)st->st_atim.tv_nsec / 1000000),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "mtime",
                                JS_NewInt64(ctx, (int64_t)st->st_mtim.tv_sec * 1000 + (int64_t)st->st_mtim.tv_nsec / 1000000),
                                JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, obj, "ctime",
                                JS_NewInt64(ctx, (int64_t)st->st_ctim.tv_sec * 1000 + (int64_t)st->st_ctim.tv_nsec / 1000000),
                                JS_PROP_C_W_E);
    return MakeObjError(ctx, obj, err);
}

static SJSStatResult *SJSStatGet(JSContext* ctx, JSValueConst obj) {
    return JS_GetOpaque2(ctx, obj, SJSStatClassID);
}

static JSValue SJSFSReqInit(JSContext* ctx, SJSFsReq *fr, JSValue obj) {
    fr->is_sync = 0;
    fr->is_reject = FALSE;
    fr->ctx = ctx;
    fr->req.data = fr;
    fr->obj = JS_DupValue(ctx, obj);
    fr->rw.tarray = JS_UNDEFINED;

    return SJSInitPromise(ctx, &fr->result);
}

static void UVFSReqCb(uv_fs_t *req) {
    SJSFsReq *fr = req->data;
    if (!fr)
        return;

    JSContext* ctx = fr->ctx;
    JSValue arg;
    SJSFile *f;
    SJSDir *d;
    BOOL is_reject = FALSE;

    if (req->result < 0) {
        arg = SJSNewError(ctx, fr->req.result);
        is_reject = TRUE;
        goto skip;
    }

    switch (req->fs_type) {
        case UV_FS_OPEN:
            arg = SJSNewFile(ctx, fr->req.result, fr->req.path);
            break;
        case UV_FS_CLOSE:
            arg = JS_UNDEFINED;
            f = SJSFileGet(ctx, fr->obj);
            f->fd = -1;
            JS_FreeValue(ctx, f->path);
            f->path = JS_UNDEFINED;
            break;
        case UV_FS_READ:
        case UV_FS_WRITE:
            arg = JS_NewInt32(ctx, fr->req.result);
            break;

        case UV_FS_STAT:
        case UV_FS_LSTAT:
        case UV_FS_FSTAT:
            arg = SJSNewStat(ctx, &fr->req.statbuf);
            break;

        case UV_FS_REALPATH:
            arg = JS_NewString(ctx, fr->req.ptr);
            break;

        case UV_FS_COPYFILE:
        case UV_FS_FDATASYNC:
        case UV_FS_FSYNC:
        case UV_FS_FTRUNCATE:
        case UV_FS_RENAME:
        case UV_FS_RMDIR:
        case UV_FS_MKDIR:
        case UV_FS_UNLINK:
            arg = JS_UNDEFINED;
            break;

        case UV_FS_MKDTEMP:
            arg = JS_NewString(ctx, fr->req.path);
            break;

        case UV_FS_MKSTEMP:
            arg = SJSNewFile(ctx, fr->req.result, fr->req.path);
            break;

        case UV_FS_OPENDIR:
            arg = SJSNewDir(ctx, fr->req.ptr, fr->req.path);
            break;

        case UV_FS_CLOSEDIR:
            arg = JS_UNDEFINED;
            d = SJSDirGet(ctx, fr->obj);
            d->dir = NULL;
            JS_FreeValue(ctx, d->path);
            d->path = JS_UNDEFINED;
            break;

        case UV_FS_READDIR:
            d = SJSDirGet(ctx, fr->obj);
            d->done = fr->req.result == 0;
            arg = JS_NewObjectProto(ctx, JS_NULL);
            JS_DefinePropertyValueStr(ctx, arg, "done", JS_NewBool(ctx, d->done), JS_PROP_C_W_E);
            if (fr->req.result != 0) {
                JSValue item = SJSNewDirent(ctx, &d->dirent);
                JS_DefinePropertyValueStr(ctx, arg, "value", item, JS_PROP_C_W_E);
            }
            break;

        default:
            abort();
    }

skip:
    if (fr->is_sync) {
        fr->sync_result = arg;
        fr->is_reject = is_reject;
    } else {
        SJSSettlePromise(ctx, &fr->result, is_reject, 1, (JSValueConst *) &arg);
    }

    JS_FreeValue(ctx, fr->obj);
    JS_FreeValue(ctx, fr->rw.tarray);

    uv_fs_req_cleanup(&fr->req);

    if (!fr->is_sync) {
        js_free(ctx, fr);
    }
}

/* File functions */

static JSValue SJSFileRW(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    /* arg 0: buffer */
    size_t size;
    uint8_t *buf = JS_GetUint8Array(ctx, &size, argv[0]);
    if (!buf)
        return JS_EXCEPTION;

    /* arg 1: position (on the file) */
    int64_t pos = -1;
    if (!JS_IsUndefined(argv[1]) && JS_ToInt64(ctx, &pos, argv[1]))
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    uv_buf_t b = uv_buf_init((char *)buf, size);

    int r;
    if (magic)
        r = uv_fs_write(SJSGetLoop(ctx), &fr->req, f->fd, &b, 1, pos, UVFSReqCb);
    else
        r = uv_fs_read(SJSGetLoop(ctx), &fr->req, f->fd, &b, 1, pos, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    SJSFSReqInit(ctx, fr, this_val);
    fr->rw.tarray = JS_DupValue(ctx, argv[0]);
    return fr->result.p;
}

static JSValue SJSFileClose(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    int r = uv_fs_close(SJSGetLoop(ctx), &fr->req, f->fd, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSFileStat(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    int r = uv_fs_fstat(SJSGetLoop(ctx), &fr->req, f->fd, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSFileTruncate(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    int64_t offset = 0;
    if (!JS_IsUndefined(argv[0]) && JS_ToInt64(ctx, &offset, argv[0]))
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    int r = uv_fs_ftruncate(SJSGetLoop(ctx), &fr->req, f->fd, offset, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSFileSync(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    int r = uv_fs_fsync(SJSGetLoop(ctx), &fr->req, f->fd, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSFileDatasync(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    int r = uv_fs_fdatasync(SJSGetLoop(ctx), &fr->req, f->fd, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSFileFileno(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;

    return JS_NewInt32(ctx, f->fd);
}

static JSValue SJSFilePathGet(JSContext* ctx, JSValueConst this_val) {
    SJSFile *f = SJSFileGet(ctx, this_val);
    if (!f)
        return JS_EXCEPTION;
    return JS_DupValue(ctx, f->path);
}

/* Dir functions */

static JSValue SJSDirClose(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSDir *d = SJSDirGet(ctx, this_val);
    if (!d)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    int r = uv_fs_closedir(SJSGetLoop(ctx), &fr->req, d->dir, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSDirPathGet(JSContext* ctx, JSValueConst this_val) {
    SJSDir *d = SJSDirGet(ctx, this_val);
    if (!d)
        return JS_EXCEPTION;
    return JS_DupValue(ctx, d->path);
}

static JSValue SJSDirNext(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSDir *d = SJSDirGet(ctx, this_val);
    if (!d)
        return JS_EXCEPTION;

    if (d->done)
        return JS_UNDEFINED;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr)
        return JS_EXCEPTION;

    d->dir->dirents = &d->dirent;
    d->dir->nentries = 1;

    int r = uv_fs_readdir(SJSGetLoop(ctx), &fr->req, d->dir, UVFSReqCb);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, this_val);
}

static JSValue SJSDirIterator(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    return JS_DupValue(ctx, this_val);
}

/* DirEnt functions */

static JSValue SJSDirentNameGet(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;
    return JS_DupValue(ctx, de->name);
}

static JSValue SJSDirentISblockdevice(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_BLOCK);
}

static JSValue SJSDirentIScharacterdevice(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_CHAR);
}

static JSValue SJSDirentISdirectory(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_DIR);
}

static JSValue SJSDirentISfifo(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_FIFO);
}

static JSValue SJSDirentISfile(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_FILE);
}

static JSValue SJSDirentISsocket(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_SOCKET);
}

static JSValue SJSDirentISSymlink(JSContext* ctx, JSValueConst this_val) {
    SJSDirEnt *de = SJSDirentGet(ctx, this_val);
    if (!de)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, de->type == UV_DIRENT_LINK);
}

/* StatResult functions */

static JSValue SJSStatISBlockdevice(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFBLK);
}

static JSValue SJSStatISCharacterdevice(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFCHR);
}

static JSValue SJSStatISDirectory(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFDIR);
}

static JSValue SJSStatISFifo(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFIFO);
}

static JSValue SJSStatISFile(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFREG);
}

static JSValue SJSStatISSocket(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

#if defined(S_IFSOCK)
    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFSOCK);
#else
    return JS_FALSE;
#endif
}

static JSValue SJSStatISSymlink(JSContext* ctx, JSValueConst this_val) {
    SJSStatResult *sr = SJSStatGet(ctx, this_val);
    if (!sr)
        return JS_EXCEPTION;

    return JS_NewBool(ctx, (sr->st_mode & S_IFMT) == S_IFLNK);
}

/* Module functions */

static int JSUVOpenFlags(const char *strflags, size_t len) {
    int flags = 0, read = 0, write = 0, i=0;

    for (i = 0; i < len; i++) {
        switch (strflags[i]) {
            case 'r':
                read = 1;
                break;
            case 'w':
                write = 1;
                flags |= O_TRUNC | O_CREAT;
                break;
            case 'a':
                write = 1;
                flags |= O_APPEND | O_CREAT;
                break;
            case '+':
                read = 1;
                write = 1;
                break;
            case 'x':
                flags |= O_EXCL;
                break;
            default:
                break;
        }
    }

    flags |= read ? (write ? O_RDWR : O_RDONLY) : (write ? O_WRONLY : 0);

    return flags;
}

static JSValue SJSFSOpen(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int is_sync) {
    const char *path;
    const char *strflags;
    size_t len;
    int flags;
    int32_t mode;

    path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    strflags = JS_ToCStringLen(ctx, &len, argv[1]);
    if (!strflags) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }
    flags = JSUVOpenFlags(strflags, len);
    JS_FreeCString(ctx, strflags);

    mode = 0;
    if (!JS_IsUndefined(argv[2]) && JS_ToInt32(ctx, &mode, argv[2])) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }
    fr->is_sync = is_sync;
    fr->req.data = fr;
    fr->ctx = ctx;
    fr->is_reject = FALSE;
    int r = uv_fs_open(SJSGetLoop(ctx), &fr->req, path, flags, mode, is_sync ? NULL : UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    if (is_sync) {
        UVFSReqCb(&fr->req);
        JSValue result = fr->sync_result;
        BOOL is_reject = fr->is_reject;
        js_free(ctx, fr);

        if (is_reject) {
            return JS_Throw(ctx, result);
        }

        return result;
    } else {
        return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
    }
}

static JSValue SJSFSNewStdioFile(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    const char *path;
    uv_file fd;

    path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    if (JS_ToInt32(ctx, &fd, argv[1])) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    JSValue obj = SJSNewFile(ctx, fd, path);

    JS_FreeCString(ctx, path);

    return obj;
}

static JSValue SJSFSStat(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    int r;
    if (magic)
        r = uv_fs_lstat(SJSGetLoop(ctx), &fr->req, path, UVFSReqCb);
    else
        r = uv_fs_stat(SJSGetLoop(ctx), &fr->req, path, UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
}

static JSValue SJSFSRealpath(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    int r = uv_fs_realpath(SJSGetLoop(ctx), &fr->req, path, UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
}

static JSValue SJSFSUnlink(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int is_sync) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }
    fr->is_sync = is_sync;
    fr->req.data = fr;
    fr->ctx = ctx;
    fr->is_reject = 0;
    int r = uv_fs_unlink(SJSGetLoop(ctx), &fr->req, path, is_sync ? NULL : UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        UVFSReqCb(&fr->req);
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    if (is_sync) {
        UVFSReqCb(&fr->req);
        JSValue result = fr->sync_result;
        BOOL is_reject = fr->is_reject;
        js_free(ctx, fr);

        if (is_reject) {
            return JS_Throw(ctx, result);
        }

        return result;
    } else {
        return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
    }
}

static JSValue SJSFSRename(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int is_sync) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    const char *new_path = JS_ToCString(ctx, argv[1]);
    if (!new_path) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        JS_FreeCString(ctx, new_path);
        return JS_EXCEPTION;
    }
    fr->is_sync = is_sync;
    fr->req.data = fr;
    fr->ctx = ctx;
    fr->is_reject = FALSE;
    int r = uv_fs_rename(SJSGetLoop(ctx), &fr->req, path, new_path, is_sync ? NULL : UVFSReqCb);
    JS_FreeCString(ctx, path);
    JS_FreeCString(ctx, new_path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    if (is_sync) {
        UVFSReqCb(&fr->req);
        JSValue result = fr->sync_result;
        js_free(ctx, fr);

        if (fr->is_reject) {
            return JS_Throw(ctx, result);
        }

        return result;
    } else {
        return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
    }
}

static JSValue SJSFSMkdtemp(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    const char *tpl = JS_ToCString(ctx, argv[0]);
    if (!tpl)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, tpl);
        return JS_EXCEPTION;
    }

    int r = uv_fs_mkdtemp(SJSGetLoop(ctx), &fr->req, tpl, UVFSReqCb);
    JS_FreeCString(ctx, tpl);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
}

static JSValue SJSFSMkstemp(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    const char *tpl = JS_ToCString(ctx, argv[0]);
    if (!tpl)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, tpl);
        return JS_EXCEPTION;
    }

    int r = uv_fs_mkstemp(SJSGetLoop(ctx), &fr->req, tpl, UVFSReqCb);
    JS_FreeCString(ctx, tpl);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
}

static JSValue SJSFSRmdir(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int is_sync) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }
    fr->is_sync = is_sync;
    fr->req.data = fr;
    fr->ctx = ctx;
    fr->is_reject = FALSE;
    int r = uv_fs_rmdir(SJSGetLoop(ctx), &fr->req, path, is_sync ? NULL : UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    if (is_sync) {
        UVFSReqCb(&fr->req);
        JSValue result = fr->sync_result;
        BOOL is_reject = fr->is_reject;
        js_free(ctx, fr);

        if (is_reject) {
            return JS_Throw(ctx, result);
        }

        return result;
    } else {
        return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
    }
}

static JSValue SJSFSCopyfile(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    const char *new_path = JS_ToCString(ctx, argv[1]);
    if (!new_path) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    int32_t flags;
    if (JS_ToInt32(ctx, &flags, argv[2])) {
        JS_FreeCString(ctx, path);
        JS_FreeCString(ctx, new_path);
        return JS_EXCEPTION;
    }

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        JS_FreeCString(ctx, new_path);
        return JS_EXCEPTION;
    }

    int r = uv_fs_copyfile(SJSGetLoop(ctx), &fr->req, path, new_path, flags, UVFSReqCb);
    JS_FreeCString(ctx, path);
    JS_FreeCString(ctx, new_path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
}

static JSValue SJSFSReaddir(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv, int is_sync) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }
    fr->is_sync = is_sync;
    fr->req.data = fr;
    fr->ctx = ctx;
    fr->is_reject = FALSE;
    int r = uv_fs_opendir(SJSGetLoop(ctx), &fr->req, path, is_sync ? NULL : UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    if (is_sync) {
        UVFSReqCb(&fr->req);
        JSValue result = fr->sync_result;
        BOOL is_reject = fr->is_reject;
        js_free(ctx, fr);

        if (is_reject) {
            return JS_Throw(ctx, result);
        }

        return result;
    } else {
        return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
    }
}

static void SJSReadfileWork(uv_work_t *req) {
    SJSReadFileReq *fr = req->data;

    fr->r = SJSLoadFile(fr->ctx, &fr->dbuf, fr->filename);
}

static void SJSWritefileWork(uv_work_t *req) {
    SJSWriteFileReq *fr = req->data;

    fr->r = SJSWriteFile(fr->ctx, fr->buf, fr->len, fr->filename);
}

static void SJSReadfileAfterWork(uv_work_t *req, int status) {
    SJSReadFileReq *fr = req->data;

    JSContext* ctx = fr->ctx;
    JSValue arg;
    BOOL is_reject = FALSE;

    if (status != 0) {
        arg = SJSNewError(ctx, status);
        is_reject = TRUE;
        dbuf_free(&fr->dbuf);
    } else if (fr->r < 0) {
        arg = SJSNewError(ctx, fr->r);
        is_reject = TRUE;
        dbuf_free(&fr->dbuf);
    } else {
        if (fr->isBinary) {
            arg = SJSNewUint8Array(ctx, fr->dbuf.buf, fr->dbuf.size);
        } else {
            arg = JS_NewStringLen(ctx, (char *)fr->dbuf.buf, fr->dbuf.size);
        }
        if (JS_IsException(arg))
            dbuf_free(&fr->dbuf);
    }

    if (!fr->is_sync) {
        SJSSettlePromise(ctx, &fr->result, is_reject, 1, (JSValueConst *) &arg);
        js_free(ctx, fr->filename);
        js_free(ctx, fr);
    } else {
        fr->sync_result = arg;
    }
};

static void SJSWritefileAfterWork(uv_work_t *req, int status) {
    SJSWriteFileReq *fr = req->data;

    JSContext* ctx = fr->ctx;
    JSValue arg;
    BOOL is_reject = FALSE;

    if (status != 0) {
        arg = SJSNewError(ctx, status);
        is_reject = TRUE;
    } else if (fr->r < 0) {
        arg = SJSNewError(ctx, fr->r);
        is_reject = TRUE;
    } else {
        arg = JS_UNDEFINED;;
    }

    if (!fr->is_sync) {
        SJSSettlePromise(ctx, &fr->result, is_reject, 1, (JSValueConst *) &arg);
        js_free(ctx, fr->filename);
        js_free(ctx, fr);
    } else {
        fr->sync_result = arg;
    }
};

static JSValue SJSFSWriteFile(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv, int is_sync) {
    const char* path = JS_ToCString(ctx, argv[0]);
    size_t size;
    char* buf = (char*)JS_GetArrayBuffer(ctx, &size, argv[1]);
    if (!path)
        return JS_EXCEPTION;

    SJSWriteFileReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    fr->ctx = ctx;
    fr->r = -1;
    fr->filename = js_strdup(ctx, path);
    fr->req.data = fr;
    fr->is_sync = is_sync;
    fr->is_reject = FALSE;
    fr->buf = buf;
    fr->len = size;
    JS_FreeCString(ctx, path);

    if (is_sync) {
        SJSWritefileWork(&fr->req);
        SJSWritefileAfterWork(&fr->req, 0);
        JSValue result = fr->sync_result;
        js_free(ctx, fr->filename);
        js_free(ctx, fr);
        return result;
    } else {
        int r = uv_queue_work(SJSGetLoop(ctx), &fr->req, SJSWritefileWork, SJSWritefileAfterWork);
        if (r != 0) {
            js_free(ctx, fr->filename);
            js_free(ctx, fr);
            return SJSThrowErrno(ctx, r);
        }
        return SJSInitPromise(ctx, &fr->result);
    }
};

static JSValue SJSFSReadFile(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv, int magic) {
    const char* path = JS_ToCString(ctx, argv[0]);
    const char* encoding = JS_ToCString(ctx, argv[1]);
    if (!path)
        return JS_EXCEPTION;

    SJSReadFileReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    fr->ctx = ctx;
    dbuf_init(&fr->dbuf);
    fr->r = -1;
    fr->filename = js_strdup(ctx, path);
    fr->req.data = fr;
    fr->is_sync = magic;
    fr->isBinary = strcmp(encoding, "binary") == 0;
    JS_FreeCString(ctx, path);
    JS_FreeCString(ctx, encoding);

    if (magic) {
        SJSReadfileWork(&fr->req);
        SJSReadfileAfterWork(&fr->req, 0);
        JSValue result = fr->sync_result;
        js_free(ctx, fr->filename);
        js_free(ctx, fr);
        return result;
    } else {
        int r = uv_queue_work(SJSGetLoop(ctx), &fr->req, SJSReadfileWork, SJSReadfileAfterWork);
        if (r != 0) {
            js_free(ctx, fr->filename);
            js_free(ctx, fr);
            return SJSThrowErrno(ctx, r);
        }
        return SJSInitPromise(ctx, &fr->result);
    }
};

static JSValue SJSFSMkdir(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv, int is_sync) {
    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    int32_t mode = 0777;
    if (argc >= 2 && !JS_IsUndefined(argv[1])) {
        if (JS_ToInt32(ctx, &mode, argv[1])) {
            JS_FreeCString(ctx, path);
            return JS_EXCEPTION;
        }
    }

    SJSFsReq *fr = js_malloc(ctx, sizeof(*fr));
    if (!fr) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }
    fr->is_sync = is_sync;
    fr->req.data = fr;
    fr->ctx = ctx;
    fr->is_reject = FALSE;
    int r = uv_fs_mkdir(SJSGetLoop(ctx), &fr->req, path, mode, is_sync ? NULL : UVFSReqCb);
    JS_FreeCString(ctx, path);
    if (r != 0) {
        js_free(ctx, fr);
        return SJSThrowErrno(ctx, r);
    }

    if (is_sync) {
        UVFSReqCb(&fr->req);
        JSValue result = fr->sync_result;
        BOOL is_reject = fr->is_reject;
        js_free(ctx, fr);

        if (is_reject) {
            return JS_Throw(ctx, result);
        }

        return result;
    } else {
        return SJSFSReqInit(ctx, fr, JS_UNDEFINED);
    }
}

#if !defined(_WIN32)
static int64_t TimeSpecToMS(const struct timespec *tv)
{
    return (int64_t)tv->tv_sec * 1000 + (tv->tv_nsec / 1000000);
}
#endif

static JSValue SJSFSStatsSync(JSContext* ctx, JSValueConst this_val,
                          int argc, JSValueConst *argv, int is_lstat)
{
    const char *path;
    int err, res;
    struct stat st;
    JSValue obj;

    path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;
#if defined(_WIN32)
    res = stat(path, &st);
#else
    if (is_lstat)
        res = lstat(path, &st);
    else
        res = stat(path, &st);
#endif
    JS_FreeCString(ctx, path);
    if (res < 0) {
        err = errno;
        obj = JS_NULL;
    } else {
        err = 0;
        obj = JS_NewObject(ctx);
        if (JS_IsException(obj))
            return JS_EXCEPTION;
        JS_DefinePropertyValueStr(ctx, obj, "dev",
                                  JS_NewInt64(ctx, st.st_dev),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "ino",
                                  JS_NewInt64(ctx, st.st_ino),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "mode",
                                  JS_NewInt32(ctx, st.st_mode),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "nlink",
                                  JS_NewInt64(ctx, st.st_nlink),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "uid",
                                  JS_NewInt64(ctx, st.st_uid),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "gid",
                                  JS_NewInt64(ctx, st.st_gid),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "rdev",
                                  JS_NewInt64(ctx, st.st_rdev),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "size",
                                  JS_NewInt64(ctx, st.st_size),
                                  JS_PROP_C_W_E);
#if !defined(_WIN32)
        JS_DefinePropertyValueStr(ctx, obj, "blocks",
                                  JS_NewInt64(ctx, st.st_blocks),
                                  JS_PROP_C_W_E);
#endif
#if defined(_WIN32)
        JS_DefinePropertyValueStr(ctx, obj, "atime",
                                  JS_NewInt64(ctx, (int64_t)st.st_atime * 1000),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "mtime",
                                  JS_NewInt64(ctx, (int64_t)st.st_mtime * 1000),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "ctime",
                                  JS_NewInt64(ctx, (int64_t)st.st_ctime * 1000),
                                  JS_PROP_C_W_E);
#elif defined(__APPLE__)
        JS_DefinePropertyValueStr(ctx, obj, "atime",
                                  JS_NewInt64(ctx, TimeSpecToMS(&st.st_atimespec)),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "mtime",
                                  JS_NewInt64(ctx, TimeSpecToMS(&st.st_mtimespec)),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "ctime",
                                  JS_NewInt64(ctx, TimeSpecToMS(&st.st_ctimespec)),
                                  JS_PROP_C_W_E);
#else
        JS_DefinePropertyValueStr(ctx, obj, "atime",
                                  JS_NewInt64(ctx, TimeSpecToMS(&st.st_atim)),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "mtime",
                                  JS_NewInt64(ctx, TimeSpecToMS(&st.st_mtim)),
                                  JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, obj, "ctime",
                                  JS_NewInt64(ctx, TimeSpecToMS(&st.st_ctim)),
                                  JS_PROP_C_W_E);
#endif
    }
    return MakeObjError(ctx, obj, err);
};

static JSValue SJSReadFileSync(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
    uint8_t *buf;
    const char *filename;
    JSValue ret;
    size_t buf_len;

    filename = JS_ToCString(ctx, argv[0]);
    if (!filename)
        return JS_EXCEPTION;
    buf = js_load_file(ctx, &buf_len, filename);
    JS_FreeCString(ctx, filename);
    if (!buf)
        return JS_NULL;
    ret = JS_NewStringLen(ctx, (char *)buf, buf_len);
    js_free(ctx, buf);
    return ret;
};

static JSValue SJSRealPathSync(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
    const char *path;
    char buf[PATH_MAX], *res;
    int err;

    path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;
    res = realpath(path, buf);
    JS_FreeCString(ctx, path);
    if (!res) {
        buf[0] = '\0';
        err = errno;
    } else {
        err = 0;
    }
    return MakeStringError(ctx, buf, err);
};

void SJSFsWatchCb(uv_fs_event_t* handle, const char* filename, int events, int status)
{
    SJSFsWatch *fw = handle->data;
    JSContext *ctx = fw->ctx;
    JSValueConst args[2];

    if (status < 0) {
        args[0] = JS_UNDEFINED;
        args[1] = SJSNewError(ctx, status);
    } else {
        args[0] = JS_NewInt32(ctx, events);
        args[1] = JS_NewString(ctx, fw->filename);
    }

    JSValue func = JS_DupValue(ctx, fw->event_func);
    JSValue ret = JS_Call(ctx, func, JS_UNDEFINED, 2, args);
    JS_FreeValue(ctx, func);
    if (JS_IsException(ret)) {
        SJSDumpError(ctx);
    }

    JS_FreeValue(ctx, ret);
    JS_FreeValue(ctx, args[0]);
    JS_FreeValue(ctx, args[1]);
}

static JSValue SJSFSWatch(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
    if (!JS_IsFunction(ctx, argv[1]))
        return JS_EXCEPTION;

    const char* path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    SJSFsWatch *fw = js_malloc(ctx, sizeof(*fw));
    if (!fw) {
        JS_FreeCString(ctx, path);
        return JS_EXCEPTION;
    }

    fw->ctx = ctx;
    fw->event.data = fw;
    fw->event_func = JS_DupValue(ctx, argv[1]);
    fw->filename = js_strdup(ctx, path);
    JS_FreeCString(ctx, path);

    uv_fs_event_init(SJSGetLoop(ctx), &fw->event);
    int r = uv_fs_event_start(&fw->event, SJSFsWatchCb, fw->filename, 0);
    if (r != 0) {
        JS_FreeValue(ctx, fw->event_func);
        js_free(ctx, fw->filename);
        js_free(ctx, fw);
        return SJSThrowErrno(ctx, r);
    }

    uv_unref((uv_handle_t *)&fw->event);
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry SJSFileProtoFuncs[] = {
    SJS_CFUNC_MAGIC_DEF("read", 2, SJSFileRW, 0),
    SJS_CFUNC_MAGIC_DEF("write", 2, SJSFileRW, 1),
    SJS_CFUNC_DEF("close", 0, SJSFileClose),
    SJS_CFUNC_DEF("fileno", 0, SJSFileFileno),
    SJS_CFUNC_DEF("stat", 0, SJSFileStat),
    SJS_CFUNC_DEF("truncate", 1, SJSFileTruncate),
    SJS_CFUNC_DEF("sync", 0, SJSFileSync),
    SJS_CFUNC_DEF("datasync", 0, SJSFileDatasync),
    SJS_CGETSET_DEF("path", SJSFilePathGet, NULL),
    JS_PROP_STRING_DEF("[Symbol.toStringTag]", "FileHandle", JS_PROP_C_W_E),
};

static const JSCFunctionListEntry SJSDirProtoFuncs[] = {
    SJS_CFUNC_DEF("close", 0, SJSDirClose),
    JS_CGETSET_DEF("path", SJSDirPathGet, NULL),
    SJS_CFUNC_DEF("next", 0, SJSDirNext),
    JS_PROP_STRING_DEF("[Symbol.toStringTag]", "DirHandle", JS_PROP_C_W_E),
    SJS_CFUNC_DEF("[Symbol.asyncIterator]", 0, SJSDirIterator),
};

static const JSCFunctionListEntry SJSDirentProtoFuncs[] = {
    SJS_CGETSET_DEF("isBlockDevice", SJSDirentISblockdevice, NULL),
    SJS_CGETSET_DEF("isCharacterDevice", SJSDirentIScharacterdevice, NULL),
    SJS_CGETSET_DEF("isDirectory", SJSDirentISdirectory, NULL),
    SJS_CGETSET_DEF("isFIFO", SJSDirentISfifo, NULL),
    SJS_CGETSET_DEF("isFile", SJSDirentISfile, NULL),
    SJS_CGETSET_DEF("isSocket", SJSDirentISsocket, NULL),
    SJS_CGETSET_DEF("isSymbolicLink", SJSDirentISSymlink, NULL),
    SJS_CGETSET_DEF("name", SJSDirentNameGet, NULL),
    JS_PROP_STRING_DEF("[Symbol.toStringTag]", "DirEnt", JS_PROP_C_W_E),
};

static const JSCFunctionListEntry SJSStatProtoFuncs[] = {
    SJS_CGETSET_DEF("isBlockDevice", SJSStatISBlockdevice, NULL),
    SJS_CGETSET_DEF("isCharacterDevice", SJSStatISCharacterdevice, NULL),
    SJS_CGETSET_DEF("isDirectory", SJSStatISDirectory, NULL),
    SJS_CGETSET_DEF("isFIFO", SJSStatISFifo, NULL),
    SJS_CGETSET_DEF("isFile", SJSStatISFile, NULL),
    SJS_CGETSET_DEF("isSocket", SJSStatISSocket, NULL),
    SJS_CGETSET_DEF("isSymbolicLink", SJSStatISSymlink, NULL),
    JS_PROP_STRING_DEF("[Symbol.toStringTag]", "StatResult", JS_PROP_C_W_E),
};

#define OS_FLAG(x) JS_PROP_INT32_DEF(#x, x, JS_PROP_CONFIGURABLE )

static const JSCFunctionListEntry SJSFSFuncs[] = {
    /* st_mode constants */
    OS_FLAG(S_IFMT),
    OS_FLAG(S_IFIFO),
    OS_FLAG(S_IFCHR),
    OS_FLAG(S_IFDIR),
    OS_FLAG(S_IFBLK),
    OS_FLAG(S_IFREG),
#if !defined(_WIN32)
    OS_FLAG(S_IFSOCK),
    OS_FLAG(S_IFLNK),
    OS_FLAG(S_ISGID),
    OS_FLAG(S_ISUID),
#endif
    SJS_CONST2("fsWatchChange", UV_RENAME),
    SJS_CONST2("fsWatchRename", UV_CHANGE),
    SJS_CONST2("COPYFILE_EXCL", UV_FS_COPYFILE_EXCL),
    SJS_CONST2("COPYFILE_FICLONE", UV_FS_COPYFILE_FICLONE),
    SJS_CONST2("COPYFILE_FICLONE_FORCE", UV_FS_COPYFILE_FICLONE_FORCE),
    SJS_CFUNC_MAGIC_DEF("open", 3, SJSFSOpen, 0),
    SJS_CFUNC_MAGIC_DEF("openSync", 3, SJSFSOpen, 1),
    SJS_CFUNC_DEF("newStdioFile", 2, SJSFSNewStdioFile),
    SJS_CFUNC_MAGIC_DEF("stat", 1, SJSFSStat, 0),
    SJS_CFUNC_DEF("statSync", 1, SJSFSStatsSync),
    SJS_CFUNC_MAGIC_DEF("lstat", 1, SJSFSStat, 1),
    SJS_CFUNC_DEF("realpath", 1, SJSFSRealpath),
    SJS_CFUNC_DEF("realPathSync", 1, SJSRealPathSync),
    SJS_CFUNC_MAGIC_DEF("unlink", 1, SJSFSUnlink, 0),
    SJS_CFUNC_MAGIC_DEF("unlinkSync", 1, SJSFSUnlink, 1),
    SJS_CFUNC_MAGIC_DEF("mkdir", 3, SJSFSMkdir, 0),
    SJS_CFUNC_MAGIC_DEF("mkdirSync", 3, SJSFSMkdir, 1),
    SJS_CFUNC_MAGIC_DEF("rename", 2, SJSFSRename, 0),
    SJS_CFUNC_MAGIC_DEF("renameSync", 2, SJSFSRename, 1),
    SJS_CFUNC_DEF("mkdtemp", 1, SJSFSMkdtemp),
    SJS_CFUNC_DEF("mkstemp", 1, SJSFSMkstemp),
    SJS_CFUNC_MAGIC_DEF("rmdir", 1, SJSFSRmdir, 0),
    SJS_CFUNC_MAGIC_DEF("rmdirSync", 1, SJSFSRmdir, 1),
    SJS_CFUNC_DEF("copyfile", 3, SJSFSCopyfile),
    SJS_CFUNC_MAGIC_DEF("readdir", 1, SJSFSReaddir, 0),
    SJS_CFUNC_MAGIC_DEF("readdirSync", 1, SJSFSReaddir, 1),
    SJS_CFUNC_MAGIC_DEF("readFile", 2, SJSFSReadFile, 0),
    SJS_CFUNC_MAGIC_DEF("readFileSync", 2, SJSFSReadFile, 1),
    SJS_CFUNC_MAGIC_DEF("writeFile", 2, SJSFSWriteFile, 0),
    SJS_CFUNC_MAGIC_DEF("writeFileSync", 2, SJSFSWriteFile, 1),
    SJS_CFUNC_DEF("watch", 2, SJSFSWatch),
};

static const JSCFunctionListEntry fs[] = {
    SJS_OBJECT_DEF("fs", SJSFSFuncs, countof(SJSFSFuncs))
};

void SJSFSInit(SJSRuntime* qrt, JSValue ns) {
    JSValue proto;
    JSContext* ctx = qrt->ctx;

    /* File object */
    JS_NewClassID(&SJSFileClassID);
    JS_NewClass(JS_GetRuntime(ctx), SJSFileClassID, &SJSFileClass);
    proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, SJSFileProtoFuncs, countof(SJSFileProtoFuncs));
    JS_SetClassProto(ctx, SJSFileClassID, proto);

    /* Dir object */
    JS_NewClassID(&SJSDirClassID);
    JS_NewClass(JS_GetRuntime(ctx), SJSDirClassID, &SJSDirClass);
    proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, SJSDirProtoFuncs, countof(SJSDirProtoFuncs));
    JS_SetClassProto(ctx, SJSDirClassID, proto);

    /* DirEnt object */
    JS_NewClassID(&SJSDirentClassID);
    JS_NewClass(JS_GetRuntime(ctx), SJSDirentClassID, &SJSDirentClass);
    proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, SJSDirentProtoFuncs, countof(SJSDirentProtoFuncs));
    JS_SetClassProto(ctx, SJSDirentClassID, proto);

    /* StatResult object */
    JS_NewClassID(&SJSStatClassID);
    JS_NewClass(JS_GetRuntime(ctx), SJSStatClassID, &SJSStatClass);
    proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, SJSStatProtoFuncs, countof(SJSStatProtoFuncs));
    JS_SetClassProto(ctx, SJSStatClassID, proto);

    SJSRegistJSApi(&fs);
}
