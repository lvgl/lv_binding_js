# Component prop groupType

`groupType` is used to control **LVGL default group** behavior (focus navigation by keyboard/encoder).

This project exports:
- `AddCurToDefGroup`: add **current component** to default group
- `AddChildToDefGroup`: when this component is used as a container, add **its children** to default group (and keep focus order consistent with UI order)

## Type
```ts
import type { AddToDefGroupType } from 'lvgljs-ui';

interface Props {
  groupType?: AddToDefGroupType;
}
```

## How it works
- **Default group**: must be created and set by platform/hal code (simulator already does this via `lv_group_set_default`).
- **AddCurToDefGroup**:
  - Adds the current component instance into the default group.
  - Useful for `View` because LVGL `lv_obj` is not `group_def` by default, but it can still be focused if added to group and has `LV_OBJ_FLAG_CLICK_FOCUSABLE`.
- **AddChildToDefGroup**:
  - Marks the current component as a “group container”.
  - When children are appended to it, those children are added into the default group.
  - Some widgets (e.g. `Button`, `Slider`, `Textarea`, etc.) are `group_def` in LVGL and will be auto-added to the default group at creation time. When they are later re-parented into the UI tree, this can cause **focus order != UI order**.
  - This binding will re-order the default group's internal list to match the container's child order when children are appended, so focus navigation follows UI order.

## Usage
```jsx
import {
  View,
  Text,
  Button,
  Slider,
  AddChildToDefGroup,
  AddCurToDefGroup,
} from 'lvgljs-ui';

export function App() {
  return (
    <View style={{ width: 300, height: 200 }} groupType={AddChildToDefGroup}>
      {/* 1) Make a focusable "row" by adding the current View to group */}
      <View groupType={AddCurToDefGroup} onFocusedStyle={{ borderWidth: 2 }}>
        <Text>Focusable View</Text>
      </View>

      {/* 2) LVGL group_def widgets (e.g. Button/Slider) will be in default group */}
      <Button onFocusedStyle={{ borderWidth: 2 }}>
        <Text>Button</Text>
      </Button>

      <Slider onFocusedStyle={{ borderWidth: 2 }} />
    </View>
  );
}
```


