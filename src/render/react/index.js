import * as react from 'react'
import ViewConfig from "./components/View/config";
import { registerComponent } from "./components/config";
import StyleSheet from './core/style'

export const View = registerComponent(new ViewConfig());

globalThis.React = react;

globalThis.StyleSheet = StyleSheet;