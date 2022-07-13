const eventMap = {}

export const EVENTTYPE_MAP = {
    EVENT_ALL: 0,

    /** Input device events*/
    EVENT_PRESSED: 1,           /**< The object has been pressed*/
    EVENT_PRESSING: 2,           /**< The object is being pressed (called continuously while pressing)*/
    EVENT_PRESS_LOST: 3,          /**< The object is still being pressed but slid cursor/finger off of the object */
    EVENT_SHORT_CLICKED: 4,       /**< The object was pressed for a short period of time, then released it. Not called if scrolled.*/
    EVENT_LONG_PRESSED: 5,        /**< Object has been pressed for at least `long_press_time`.  Not called if scrolled.*/
    EVENT_LONG_PRESSED_REPEAT: 6, /**< Called after `long_press_time` in every `long_press_repeat_time` ms.  Not called if scrolled.*/
    EVENT_CLICKED: 7,             /**< Called on release if not scrolled (regardless to long press)*/
    EVENT_RELEASED: 8,            /**< Called in every cases when the object has been released*/
    EVENT_SCROLL_BEGIN: 9,        /**< Scrolling begins. The event parameter is a pointer to the animation of the scroll. Can be modified*/
    EVENT_SCROLL_END: 10,          /**< Scrolling ends*/
    EVENT_SCROLL: 11,              /**< Scrolling*/
    EVENT_GESTURE: 12,             /**< A gesture is detected. Get the gesture with `indev_get_gesture_dir(indev_get_act());` */
    EVENT_KEY: 13,                 /**< A key is sent to the object. Get the key with `indev_get_key(indev_get_act());`*/
    EVENT_FOCUSED: 14,             /**< The object is focused*/
    EVENT_DEFOCUSED: 15,           /**< The object is defocused*/
    EVENT_LEAVE: 16,               /**< The object is defocused but still selected*/
    EVENT_HIT_TEST: 17,            /**< Perform advanced hit-testing*/

    /** Drawing events*/
    EVENT_COVER_CHECK: 18,        /**< Check if the object fully covers an area. The event parameter is `cover_check_info_t *`.*/
    EVENT_REFR_EXT_DRAW_SIZE: 19, /**< Get the required extra draw area around the object (e.g. for shadow). The event parameter is `coord_t *` to store the size.*/
    EVENT_DRAW_MAIN_BEGIN: 20,    /**< Starting the main drawing phase*/
    EVENT_DRAW_MAIN: 21,          /**< Perform the main drawing*/
    EVENT_DRAW_MAIN_END: 22,      /**< Finishing the main drawing phase*/
    EVENT_DRAW_POST_BEGIN: 23,    /**< Starting the post draw phase (when all children are drawn)*/
    EVENT_DRAW_POST: 24,          /**< Perform the post draw phase (when all children are drawn)*/
    EVENT_DRAW_POST_END: 25,      /**< Finishing the post draw phase (when all children are drawn)*/
    EVENT_DRAW_PART_BEGIN: 26,    /**< Starting to draw a part. The event parameter is `obj_draw_dsc_t *`. */
    EVENT_DRAW_PART_END: 27,      /**< Finishing to draw a part. The event parameter is `obj_draw_dsc_t *`. */

    /** Special events*/
    EVENT_VALUE_CHANGED: 28,       /**< The object's value has changed (i.e. slider moved)*/
    EVENT_INSERT: 29,              /**< A text is inserted to the object. The event data is `char *` being inserted.*/
    EVENT_REFRESH: 30,             /**< Notify the object to refresh something on it (for the user)*/
    EVENT_READY: 31,               /**< A process has finished*/
    EVENT_CANCEL: 32,              /**< A process has been cancelled */

    /** Other events*/
    EVENT_DELETE: 33,              /**< Object is being deleted*/
    EVENT_CHILD_CHANGED: 33,       /**< Child was removed, added, or its size, position were changed */
    EVENT_CHILD_CREATED: 34,       /**< Child was created, always bubbles up to all parents*/
    EVENT_CHILD_DELETED: 35,       /**< Child was deleted, always bubbles up to all parents*/
    EVENT_SCREEN_UNLOAD_START: 36, /**< A screen unload started, fired immediately when scr_load is called*/
    EVENT_SCREEN_LOAD_START: 37,   /**< A screen load started, fired when the screen change delay is expired*/
    EVENT_SCREEN_LOADED: 38,       /**< A screen was loaded*/
    EVENT_SCREEN_UNLOADED: 39,     /**< A screen was unloaded*/
    EVENT_SIZE_CHANGED: 40,        /**< Object coordinates/size have changed*/
    EVENT_STYLE_CHANGED: 41,       /**< Object's style has changed*/
    EVENT_LAYOUT_CHANGED: 42,      /**< The children position has changed due to a layout recalculation*/
    EVENT_GET_SELF_SIZE: 43,       /**< Get the internal size of a widget*/

    _EVENT_LAST: 44,               /** Number of default events*/


    EVENT_PREPROCESS: 0x80,   /** This is a flag that can be set with an event so it's processed
                                      before the class default event processing */
}

export function registEvent (uid, eventType, fn) {
    eventMap[uid] = eventMap[uid] || {}
    eventMap[uid][eventType] = fn
}

export function unRegistEvent (uid, eventType) {
    if (!eventType) {
        delete eventMap[uid]
    } else {
        const obj = eventMap[uid]
        obj && delete obj[eventType]
    }
}

export function fireEvent (uid, eventType, e) {
    const obj = eventMap[uid]
    if (obj) {
        try {
            obj[eventType].call(null, e);
        } catch (err) {
            console.log(err)
        }
    }
}

globalThis.FIRE_QEVENT_CALLBACK = fireEvent