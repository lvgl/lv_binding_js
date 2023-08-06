import reconciler from "../reconciler";

const bridge = globalThis.SJSJSBridge;

const containerInfo = new Set();

export class Renderer {
  static container;
  static portalContainer;

  static render(element, options) {
    const isConcurrent = true;
    const hydrate = false;

    Renderer.container = reconciler.createContainer(
      containerInfo,
      isConcurrent,
      hydrate,
    );

    const parentComponent = null;
    reconciler.updateContainer(element, Renderer.container, parentComponent);
  }
}
