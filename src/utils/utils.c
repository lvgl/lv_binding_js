#include "utils.h"

void GetProgramDir (char* buf) {
    char str[PATH_MAX];
	char* dir;

	#ifdef __APPLE__
		unsigned size = PATH_MAX;
		_NSGetExecutablePath(str, &size);
		str[size] = '\0';
		printf("The path is: %s\n", str);
	#else
    	snprintf(str, sizeof(str), "/proc/self/exe");
	#endif

    #ifdef __APPLE__
    	dir = dirname(str);
		strcpy(buf, dir);
	#else
		readlink(str, buf, sizeof(str));
		dir = dirname(buf);
		strcpy(buf, dir);
	#endif
};

#ifndef WIN32

static void _split_whole_name(const char *whole_name, char *fname, char *ext) {
	char *p_ext;

    if (whole_name == NULL) {
        return;
    }
 
	p_ext = strrchr(whole_name, '.');
	if (NULL != p_ext)
	{
		if (ext != NULL) {
            strcpy(ext, p_ext);
        }
        if (fname != NULL) {
		    snprintf(fname, p_ext - whole_name + 1, "%s", whole_name);
        }
	}
	else
	{
        if (ext != NULL) {
		    ext[0] = '\0';
        }
        if (fname != NULL) {
		    strcpy(fname, whole_name);
        }
	}
};

void _splitpath(const char *path, char *drive, char *dir, char *fname, char *ext) {
	char *p_whole_name;
 
	if (NULL != drive) {
        drive[0] = '\0';
    }
	if (NULL == path)
	{
		if (NULL != ext) {
            ext[0] = '\0';
        }
		if (NULL != dir) {
            dir[0] = '\0';
        }
        if (NULL != fname) {
            fname[0] = '\0';
        }
		return;
	}
 
	if ('/' == path[strlen(path)])
	{
		strcpy(dir, path);
		if (NULL != fname) {
            fname[0] = '\0';
        }
		if (NULL != ext) {
            ext[0] = '\0';
        }
		return;
	}
 
	p_whole_name = strrchr(path, '/');
	if (NULL != p_whole_name)
	{
		p_whole_name++;
		_split_whole_name(p_whole_name, fname, ext);

        if (NULL != dir) {
		    snprintf(dir, p_whole_name - path, "%s", path);
        }
	}
	else
	{
		_split_whole_name(path, fname, ext);
		if (NULL != drive) {
            drive[0] = '\0';
        }
	}
};

#endif

void ReplenishExt (char* path) {
    char ext[128] = {0};
    _splitpath(path, NULL, NULL, NULL, ext);
    if (ext[0] == '\0') {
        strcat(path, ".js");
    }
}