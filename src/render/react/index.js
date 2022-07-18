import * as react from 'react'
import ViewConfig from "./components/View/config";
import WindowConfig from "./components/Window/config";
import TextConfig from "./components/Text/config";
import ImageConfig from "./components/Image/config";

import { registerComponent } from "./components/config";
import StyleSheet from './core/style';
import { Renderer } from "./core/renderer";

export const View = registerComponent(new ViewConfig());
export const Window = registerComponent(new WindowConfig());
export const Text = registerComponent(new TextConfig());
export const Image = registerComponent(new ImageConfig());

export const Render = Renderer;