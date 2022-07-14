#pragma once

extern "C" {
    #include "quickjs-libc.h"
    #include <sjs.h>
}

#include <QEvent>
#include <QWidget>
#include <QLineEdit>
#include <QTextEdit>

#include <stdlib.h>

#include "engine.hpp"
#include "core/JSUtils/Event/Event.h"
#include "components/input/Input.hpp"
#include "components/textarea/Textarea.hpp"