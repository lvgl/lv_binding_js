
#include "View.hpp"

View::View(lv_obj_t *parent): BasicComponent() {
    this->instance = lv_obj_create(parent);
};

static std::map<QEvent::Type, std::string> supportEvents {
  { QEvent::MouseButtonPress, "click" },
  { QEvent::MouseMove, "mouseMove" }
};