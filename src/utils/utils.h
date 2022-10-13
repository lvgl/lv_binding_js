#ifndef UTILSH
#define UTILSH

#include <libgen.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <limits.h>

#ifdef __APPLE__ 
    #include <mach-o/dyld.h>
#endif
#include <unistd.h>

#if defined(_WIN32)
#define SJSPATHSEP  "\\"
#else
#define SJSPATHSEP  "/"
#endif

void GetProgramDir (char* buf);

#ifndef WIN32
void _splitpath(const char *path, char *drive, char *dir, char *fname, char *ext);
#endif

void ReplenishExt (char* path);

#endif