import './modal.less';
import template from './modal.html';

export const modalComponent = () => {
    const modalLink = (scope, element) => {
        scope.pokemon = {types: []};
        const id = document.bag.id;
        document.bag.pokeApi.getPokemon(document.bag.id).then((pokemon) => {
            scope.loaded = true;
            scope.pokemon = pokemon;
        });
    };

    return {
        template,
        controller() {
        },
        controllerAs: '$ctrl',
        bindToController: true,
        restrict: 'E',
        replace: true,
        link: modalLink
    };
};