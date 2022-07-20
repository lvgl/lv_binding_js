const nativefs = globalThis.SJSJSBridge.fs

class Stat {
    constructor (stat) {
        this.stat = stat
    }

    isFile () {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFREG
    }

    isDirectory() {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFDIR
    }

    isCharacterDevice() {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFCHR
    }

    isBlockDevice() {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFBLK
    }

    isFIFO() {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFIFO
    }

    isSocket() {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFSOCK
    }

    isSymbolicLink() {
        return (this.stat?.mode & nativefs.S_IFMT) === nativefs.S_IFLNK
    }

    get dev () {
        return this.stat?.dev
    }

    get info () {
        return this.stat?.info
    }

    get mode () {
        return this.stat?.mode
    }

    get nlink () {
        return this.stat?.nlink
    }

    get uid () {
        return this.stat?.uid
    }

    get gid () {
        return this.stat?.gid
    }

    get rdev () {
        return this.stat?.rdev
    }

    get size () {
        return this.stat?.size
    }

    get blocks () {
        return this.stat?.blocks
    }

    get atime () {
        return this.stat?.atime
    }

    get mtime () {
        return this.stat?.mtime
    }

    get ctime () {
        return this.stat?.ctime
    }

    get size () {
        return this.stat?.size
    }
}

async function statAsync () {
    const [stat, err] = await nativefs.statSync(path);
    return new Stat(stat)
}

function statSync (path) {
    const [stat, err] = nativefs.statSync(path);
    return new Stat(stat)
}

function realPathSync (path) {
    const [filename, err] = nativefs.realPathSync(path)
    return filename
}

function readFileSync (path, encoding = null) {
    const data = nativefs.readFileSync(path)

    if (encoding !== 'utf-8') {
        return Buffer.from(data)
    }

    return data
}

async function readFile (path) {
    const data = await nativefs.readFile(path)

    if (encoding !== 'utf-8') {
        return Buffer.from(data)
    }

    return data
}

module.exports = {
    statSync,
    stat: statAsync,
    realPathSync,
    readFileSync,
    readFile,
}