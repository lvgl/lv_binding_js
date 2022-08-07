import * as react from 'react'
import ViewConfig from "./components/View/config";
import WindowConfig from "./components/Window/config";
import TextConfig from "./components/Text/config";
import ImageConfig from "./components/Image/config";
import ButtonConfig from "./components/Button/config";
import SliderConfig from './components/Slider/config';

import { registerComponent } from "./components/config";
import { Renderer } from "./core/renderer";

export const View = registerComponent(new ViewConfig());
export const Window = registerComponent(new WindowConfig());
export const Text = registerComponent(new TextConfig());
export const Image = registerComponent(new ImageConfig());
export const Button = registerComponent(new ButtonConfig());
export const Slider = registerComponent(new SliderConfig());

export { EAlignType } from './components/config'
export { EAnimateEasingFunc, Animate } from './core/animate'

export const Render = Renderer;