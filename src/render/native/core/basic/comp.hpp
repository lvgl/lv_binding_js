#include <string>
extern "C" {
    #include "lvgl.h"
};

class BasicComponent {
  private:
    lv_obj_t* instance = nullptr;
  public:
    ~BasicComponent();

    std::string uid;

    std::map<std::string, bool> registerEvents;

    void addEventListener(std::string eventType);
    void removeEventListener(std::string eventType);

    bool isEventRegist(std::string eventType);

    void appendChild(void* child);
    void removeChild(void* child);
    void insertChildBefore(void *child, void* beforeChildNode);
}