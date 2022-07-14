#pragma once

extern "C" {
    #include "quickjs-libc.h"
    #include <sjs.h>
}

#include <QEvent>
#include <QWidget>

#include <stdlib.h>

#include "engine.hpp"
#include "core/JSUtils/Event/Event.h"