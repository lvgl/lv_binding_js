import { Window } from './comp'

export default class WindowConfig {
    tagName = 'Window';
    shouldSetTextContent() {
        return false;
    }
    createInstance(
        newProps,
        rootInstance,
        context,
        workInProgress
    ) {
        const instance = new Window();
        instance.setProps(newProps, {});
        return instance;
    }
    commitMount(
        instance,
        props,
        internalInstanceHandle
    ) {
    }
    commitUpdate(
        instance,
        updatePayload,
        oldProps,
        newProps,
        finishedWork
    ) {
        instance.setProps(newProps, oldProps);
    }
    setProps(newProps, oldProps) {
    }
    insertBefore(child, beforeChild) {

    }
    appendInitialChild(child) {
    }
    appendChild(child) {
        
    }
    removeChild(child) {
    }
}
