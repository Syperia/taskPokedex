import 'bootstrap-webpack!./bootstrap.config.js';
import 'font-awesome-webpack';

import { appComponent } from './app.component';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
// for modal windows
import './ui-bootstrap-custom-tpls-2.4.0.min';

import { shared } from './shared/shared';
import { components } from './components/components';

angular.module('app', [
  uiRouter,
  ngAnimate,
  'ui.bootstrap',
  shared.name,
  components.name
])
.component('app', appComponent);
