import './pokemon.less';
import template from './pokemon.html';

export const pokemonComponent = () => {
  const pokemonLink = (scope, element) => {
    const id = scope.$ctrl.pokemon.pic;
    const pokemonUrl = scope.$ctrl.pokemon.pic;
    const image = new Image();
    const onload = () => {
      const elem = element[0];
      elem.classList.remove('preload');
      elem.querySelector('img').src = pokemonUrl;
    };
    image.addEventListener('load', onload);
    element.on('$destroy', () => image.removeEventListener('load', onload));
    image.src = pokemonUrl;

    scope.togglePokemon = () => {
      scope.$ctrl.pokemon.favorite=!scope.$ctrl.pokemon.favorite;
      scope.$parent.$ctrl.saveFavorite(scope.$ctrl.pokemon)
    };

    scope.openPokemon = () => {
      scope.$parent.$ctrl.openPokemon(scope.$ctrl.pokemon.id)
    };
  };

  return {
    template,
    controller() {},
    controllerAs: '$ctrl',
    scope: {
      pokemon: '<'
    },
    bindToController: true,
    restrict: 'E',
    replace: true,
    link: pokemonLink
  };
};