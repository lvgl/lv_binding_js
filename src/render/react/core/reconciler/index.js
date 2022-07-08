import Reconciler from "react-reconciler";
import {
  getComponentByTagName,
} from "../../components/config";

const HostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    let context = {
      name: "rootnode"
    };
    return context;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return {};
  },
  shouldSetTextContent: function(type, nextProps) {
    return false
  },
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    const { createInstance } = getComponentByTagName(type);
    return createInstance(
      newProps,
      rootContainerInstance,
      _currentHostContext,
      workInProgress
    );
  },
  createTextInstance: (text) => {
    const { createInstance } = getComponentByTagName('text');
    return createInstance(text)
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (yueElement, type, props) => {
    return true
  },
  insertBefore: (parent, child, beforeChild) => {
    parent.insertBefore(child, beforeChild);
  },
  supportsMutation: true,
  appendChildToContainer: function(container, child) {
    container.add(child);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.add(child);
  },
  removeChildFromContainer: (container, child) => {
    container.delete(child);
    if (child.close) {
      child.close();
    }
  },
  prepareUpdate(instance, oldProps, newProps) {
    return true;
  },
  commitUpdate: function(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    const { commitUpdate } = getComponentByTagName(type);
    return commitUpdate(
      instance,
      updatePayload,
      oldProps,
      newProps,
      finishedWork
    );
  },
  commitTextUpdate(textInstance, oldText, newText) {},
  removeChild(parent, child) {
    parent?.removeChild(child);
  },
  commitMount: function(instance, type, newProps, internalInstanceHandle) {
    const { commitMount } = getComponentByTagName(type);
    return commitMount(instance, newProps, internalInstanceHandle);
  },
};

export default Reconciler(HostConfig);
