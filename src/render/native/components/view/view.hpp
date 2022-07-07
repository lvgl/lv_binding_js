#pragma once
#include <stdlib.h>

#include "components/Components.hpp"

class View {
 public:
  View(QWidget *parentWidget = nullptr);
  ~View();
  void appendChild(void* child, void* flexNode);
  void removeChild(void* child, void* flexNode);
  void insertChildBefore(void *childWidget, void* beforeChildNode, void* childNode);
  bool event(QEvent *e) override;
};