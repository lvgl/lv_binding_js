const bridge = globalThis[Symbol.for('lvgljs')];
const nativeTheme = bridge.NativeRender.theme;

export const Theme = {
  setTheme({ primaryColor, secondPrimaryValue, fontSize }) {
    nativeTheme.setTheme({
      primaryColor,
      secondPrimaryValue,
      fontSize,
    });
  },
  resetTheme() {
    nativeTheme.resetTheme();
  },
};
