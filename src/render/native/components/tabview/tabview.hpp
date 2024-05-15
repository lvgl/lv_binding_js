#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class TabView final : public BasicComponent {
 public:
  TabView(std::string uid, uint32_t pos, uint32_t size, lv_obj_t* parent = nullptr);

  void setTab(std::string& tab, BasicComponent* content);
};
