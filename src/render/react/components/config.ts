import { HostConfig } from "react-reconciler";
import {
  ALIGN_TYPE_MAP,
  LV_DIR_MAP,
  PART_TYPE,
  STATE_TYPE,
} from "../core/lv_types";

export { handleEvent } from "../core/event";
export { unRegistEvent, EVENTTYPE_MAP } from "../core/event";
export { setStyle } from "../core/style";
import * as React from 'react';

const components = new Map<LvgljsComponentConfig<any, any>['tagName'], LvgljsComponentConfig<any, any>>();

export const getComponentByTagName = (tagName) => {
  const config = components.get(tagName);
  if (!config) {
    throw `Unknown component ${tagName}`;
  }
  return config;
};

export function registerComponent<Props, Comp>(
  config: LvgljsComponentConfig<Props, Comp>): React.ComponentType<Props> | string {
  if (components.has(config.tagName)) {
    throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
  }
  components.set(config.tagName, config);
  return config.tagName;
}

export function registerComponents<Props, Comp>(configs: LvgljsComponentConfig<Props, Comp>[]) {
  configs.forEach((config) => {
    if (components.has(config.tagName)) {
      throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
    }
    components.set(config.tagName, config);
  });
}

export const EAlignType = ALIGN_TYPE_MAP;

export const STYLE_TYPE = {
  ...PART_TYPE,
  ...STATE_TYPE,
} as const;

export const EDropdownlistDirection = LV_DIR_MAP;

/**
 * Dropdownlist::setArrowDir (EArrowType in dropdownlist.hpp).
 * Not LV_DIR_MAP - custom arrow glyph order: up, right, down, left.
 */
export const EDropdownListArrowDirection = {
  up: 0, // DROPDOWNLIST_UP
  right: 1, // DROPDOWNLIST_RIGHT
  down: 2, // DROPDOWNLIST_DOWN
  left: 3, // DROPDOWNLIST_LEFT
} as const;

export const styleGetterProp: readonly (string | symbol)[] = ["height", "width", "left", "top"] as const;

const DATA_ATTR_PREFIX = "data-";

/** Copies `data-*` props from a props object onto `comp.dataset`. */
export function applyDataPropsToDataset(
  comp: { dataset: Record<string, unknown> },
  props: Record<string, unknown>,
): void {
  comp.dataset = {};
  for (const prop of Object.keys(props)) {
    if (!prop.startsWith(DATA_ATTR_PREFIX)) continue;
    comp.dataset[prop.slice(DATA_ATTR_PREFIX.length)] = props[prop];
  }
}

export type LvgljsComponentConfig<ComponentProps, ComponentInstance> = Pick<
  HostConfig<any, ComponentProps, any, ComponentInstance, any, any, any, any, any, any, any, any>,
  | "shouldSetTextContent"
  | "createInstance"
  | "commitMount"
  | "commitUpdate"
  | "commitUpdate"
  | "insertBefore"
  | "appendInitialChild"
  | "appendChild"
> & { tagName: string };
