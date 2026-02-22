import { LvgljsComponentConfig } from "../config";
import { ViewComp, ViewProps } from "./comp";
import { UpdatePayload } from "../../core/reconciler/propDiffer";

export default class ViewConfig implements LvgljsComponentConfig<ViewProps, ViewComp> {
  tagName = "View";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: ViewProps, rootInstance, context, workInProgress, uid) {
    const instance = new ViewComp({ uid });
    instance.setProps(newProps, {} as ViewProps);
    return instance;
  }
  commitMount(instance, newProps: ViewProps, internalInstanceHandle) {}
  commitUpdate(instance: ViewComp, updatePayload: UpdatePayload<ViewProps>, oldProps: ViewProps, newProps: ViewProps, finishedWork) {
    instance.setProps(updatePayload, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: ViewProps, oldProps: ViewProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
