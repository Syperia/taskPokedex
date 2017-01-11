class FavoriteController {
  constructor(pokeApi, $uibModal) {
    this.pokemonApi = pokeApi;
    this.title = 'Favorite';
    this.pokemons = [];

    this.saveFavorite = (pokemon) => {
      this.pokemonApi.saveFavorite(pokemon)
    };

    this.openPokemon = (id) => {
      document.bag = {pokeApi: pokeApi, id: id};
      var modalInstance = $uibModal.open({
        component: 'modal'
      });
    }
  }

  $onInit() {
    this.pokemons = this.pokemonApi.getFavorite();
  }
}

FavoriteController.$inject = ['pokeApi', '$uibModal'];

export { FavoriteController };