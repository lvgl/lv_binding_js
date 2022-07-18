#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Window : public BasicComponent {
 public:
  Window(std::string uid);
};