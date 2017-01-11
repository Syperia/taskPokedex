import angular from 'angular';
import { homeComponent } from './home.component';
import { pokemon } from '../common/pokemon/pokemon';
import { modal } from '../common/modal/modal';

export const home = angular.module('home', [
  pokemon.name, modal.name
])
.config(($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) => {
  $urlMatcherFactoryProvider.strictMode(false);
  $urlRouterProvider.otherwise('/pokemons');
  $locationProvider.html5Mode(true);
  $stateProvider.state('home', {
    url: '/pokemons',
    template: '<home></home>'
  });
})
.component('home', homeComponent);
