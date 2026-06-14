import { SPEC_LV_CONF_STUB } from "./lv_conf.stub";

(globalThis as { [key: symbol]: unknown })[Symbol.for("lvgljs")] = {
  NativeRender: {
    lv_conf: new Proxy(SPEC_LV_CONF_STUB, {
      get(target, prop) {
        return (target as Record<string | symbol, number>)[prop] ?? 0;
      },
    }),
  },
};
