#include "./utils.hpp"
#include <src/core/lv_group.h>
#include <src/core/lv_obj.h>
#include <vector>
#include <unordered_map>
#include <algorithm>

extern "C" {
    #include "lvgl.h"
    #include "private.h"
};

static void getDesiredOrder(lv_obj_t* parent, std::vector<lv_obj_t*>& desired, lv_group_t* def_group) {
    // Desired order: parent's children order, but only those currently in default group.
    if (!parent || !def_group) return;
    uint32_t child_cnt = lv_obj_get_child_cnt(parent);
    for (uint32_t i = 0; i < child_cnt; i++) {
        lv_obj_t* child = lv_obj_get_child(parent, i);
        if (!child) continue;
        if (lv_obj_get_group(child) == def_group) desired.push_back(child);
    }
}

static size_t getMatchedSize(lv_group_t* def_group, std::vector<lv_obj_t*>& desired,
    std::unordered_map<lv_obj_t*, void*>& node_of
) {
    size_t matched_size = 0;
    node_of.reserve(desired.size());

    void* node;
    _LV_LL_READ(&def_group->obj_ll, node) {
        lv_obj_t** obj_i = static_cast<lv_obj_t**>(node);
        lv_obj_t* obj = *obj_i;
        if (std::find(desired.begin(), desired.end(), obj) != desired.end()) {
            if (desired[matched_size] == obj) matched_size++;
            node_of[obj] = node;
            if (matched_size == desired.size()) break;
        }
    }
    return matched_size;
}

static void startReorder(lv_group_t* def_group, std::vector<lv_obj_t*>& desired, 
    std::unordered_map<lv_obj_t*, void*>& node_of
) {
    for (size_t i = desired.size() - 1; i > 0; i--) {
        void* n_act = node_of[desired[i - 1]];
        void* n_after = node_of[desired[i]];
        if (n_act && n_after && n_act != n_after) {
            _lv_ll_move_before(&def_group->obj_ll, n_act, n_after);
        }
    }
}

void reorderFocusGroup(lv_obj_t * parent) {
    if (!parent) return;

    std::vector<lv_obj_t*> desired;
    getDesiredOrder(parent, desired, lv_group_get_default());
    if (desired.size() < 2) return;

    std::unordered_map<lv_obj_t*, void*> node_of;
    size_t matched_size = getMatchedSize(lv_group_get_default(), desired, node_of);
    if (matched_size == desired.size()) return;

    startReorder(lv_group_get_default(), desired, node_of);
}