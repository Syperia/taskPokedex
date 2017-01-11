import angular from 'angular';
import { favoriteComponent } from './favorite.component';
import { pokemon } from '../common/pokemon/pokemon';
import { modal } from '../common/modal/modal';

export const favorite = angular.module('favorite', [
  pokemon.name, modal.name
])
.config(($stateProvider) => {
  $stateProvider.state('favorite', {
    url: '/pokemons/favorite',
    template: '<favorite></favorite>'
  });
})
.component('favorite', favoriteComponent);
