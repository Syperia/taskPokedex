import angular from 'angular';
import { home } from './home/home';
import { favorite } from './favorite/favorite';

const components = angular.module('app.components', [
  home.name,
  favorite.name
]);

export { components };
