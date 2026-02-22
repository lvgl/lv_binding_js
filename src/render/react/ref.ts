import * as React from "react";
import { LvgljsComponentConfig, registerComponent } from "./components/config";

export type WithRef<Props, Instance> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<Instance>
>;

/**
 * Type-only helper: declare that a host component supports `ref` to its public instance.
 * Runtime behavior is unchanged; reconciler already supports refs via `getPublicInstance`.
 */
export function registerWithRef<Props, Instance>(config: LvgljsComponentConfig<Props, Instance>): WithRef<Props, Instance> {
  return registerComponent<Props, Instance>(config) as unknown as WithRef<Props, Instance>;
}
