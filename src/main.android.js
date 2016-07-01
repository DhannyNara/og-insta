/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './components/App';

const instructions = 'Shake or press menu button for dev menu';

const Root = () => (
  <App instructions={instructions} />
);

AppRegistry.registerComponent('App', () => Root);
