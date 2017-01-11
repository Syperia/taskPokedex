import angular from 'angular';
import { pokemonComponent } from './pokemon.component';

export const pokemon = angular.module('pokemon', [])
  .directive('pokemon', pokemonComponent);
