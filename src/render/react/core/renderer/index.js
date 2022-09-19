import reconciler from '../reconciler'

const containerInfo = new Set()

const REACT_PORTAL_TYPE = Symbol.for('react.portal')
export class Renderer {
  static container;
  static render(element, options) {
    const isConcurrent = true;
    const hydrate = false;

    Renderer.container = reconciler.createContainer(
      containerInfo,
      isConcurrent,
      hydrate
    );

    const parentComponent = null;
    reconciler.updateContainer(
      element,
      Renderer.container,
      parentComponent
    )
  }

  static createPortal(
    children,
    containerInfo,
    implementation,
    key= null,
   ) {
    containerInfo = containerInfo || Renderer.container

    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: key == null ? null : '' + key,
      children,
      containerInfo,
      implementation,
    };
  }
};