import { LvgljsComponentConfig } from "../config";
import { ProgressBarComp, ProgressBarProps } from "./comp";

export default class ProgressBarConfig implements LvgljsComponentConfig<ProgressBarProps, ProgressBarComp> {
  tagName = "ProgressBar";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: ProgressBarProps, rootInstance, context, workInProgress, uid) {
    const instance = new ProgressBarComp({ uid });
    instance.setProps(newProps, {} as ProgressBarProps);
    return instance;
  }
  commitMount(instance, newProps: ProgressBarProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: ProgressBarProps, newProps: ProgressBarProps, finishedWork) {
    instance.setProps(updatePayload, oldProps);
  }
  setProps(newProps: ProgressBarProps, oldProps: ProgressBarProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
