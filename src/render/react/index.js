import * as react from 'react'
import ViewConfig from "./components/View/config";
import WindowConfig from "./components/Window/config";

import { registerComponent } from "./components/config";
import StyleSheet from './core/style';
import { Renderer } from "./core/renderer";

export const View = registerComponent(new ViewConfig());
export const Window = registerComponent(new WindowConfig());

export const Render = Renderer;

globalThis.React = react;

globalThis.StyleSheet = StyleSheet;