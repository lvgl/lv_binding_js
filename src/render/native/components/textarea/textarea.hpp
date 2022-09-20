#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Textarea : public BasicComponent {
 public:
  bool auto_raise_keyboard = true;

  lv_obj_t* keyboard;

  Textarea(std::string uid, lv_obj_t* parent = nullptr);

  void setOneLine (bool payload);

  void setText (std::string str);

  void setPlaceHolder (std::string str);

  void setPasswordMode (bool payload);

  void setMaxLength (int32_t len);

  void setMode (int32_t mode);

  void setAutoRaiseKeyboard (bool payload);

  static void raiseKeyboard (lv_event_t * event);
  static void hideKeyboard (lv_event_t * event);

  virtual void initCompStyle (int32_t type);
};