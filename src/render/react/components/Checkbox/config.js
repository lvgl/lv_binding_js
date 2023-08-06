import { CheckboxComp } from "./comp";

export default class CheckboxConfig {
  tagName = "Checkbox";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new CheckboxComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps, oldProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
