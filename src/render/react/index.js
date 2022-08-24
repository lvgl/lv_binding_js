import * as react from 'react'
import ViewConfig from "./components/View/config";
import WindowConfig from "./components/Window/config";
import TextConfig from "./components/Text/config";
import ImageConfig from "./components/Image/config";
import ButtonConfig from "./components/Button/config";
import SliderConfig from './components/Slider/config';
import SwitchConfig from './components/Switch/config';
import TextareaConfig from './components/Textarea/config';
import InputConfig from './components/Input/config';
import KeyboardConfig from './components/Keyboard/config';
import CheckboxConfig from './components/Checkbox/config';
import DropdownlistConfig from './components/Dropdownlist/config';
import ProgressBarConfig from './components/ProgressBar/config';
import RollerConfig from './components/Roller/config';

import { registerComponent } from "./components/config";
import { Renderer } from "./core/renderer";

export const View = registerComponent(new ViewConfig());
export const Window = registerComponent(new WindowConfig());
export const Text = registerComponent(new TextConfig());
export const Image = registerComponent(new ImageConfig());
export const Button = registerComponent(new ButtonConfig());
export const Slider = registerComponent(new SliderConfig());
export const Switch = registerComponent(new SwitchConfig());
export const Textarea = registerComponent(new TextareaConfig());
export const Input = registerComponent(new InputConfig());
export const Keyboard = registerComponent(new KeyboardConfig());
export const Checkbox = registerComponent(new CheckboxConfig());
export const Dropdownlist = registerComponent(new DropdownlistConfig());
export const ProgressBar = registerComponent(new ProgressBarConfig());
export const Roller = registerComponent(new RollerConfig());

export { EAlignType, EDropdownlistDirection, EDropdownListArrowDirection } from './components/config'
export { EAnimateEasingFunc, Animate } from './core/animate'

export const Render = Renderer;