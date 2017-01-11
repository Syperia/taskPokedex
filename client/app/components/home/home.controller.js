class HomeController {
  constructor(pokeApi, $uibModal) {
    this.pokemonApi = pokeApi;
    this.title = 'Pokedex';
    this.pokemons = [];

    this.typeFilter = "";
    this.offset = 0;
    this.loading = false;

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
    this.loadPokemons();
    this.pokemonApi.getTypes().then(data => (this.types = data))
  }

  loadPokemons() {
    this.loading = true;
    this.pokemonApi.getPokemons({ limitTo: 12, offset: this.offset })
      .then(data => {
        this.pokemons = this.pokemons.concat(data);
        this.loading = false
      });
  }

  loadMore() {
    this.offset += 12;
    this.loadPokemons()
  }

  updateTypeFilter() {
    this.pageSize = +this.pageSizeVM;
    this.loadRandom();
  }

  typeFilterFn = (pokemon) => {
    if (!this.typeFilter) {
      return true
    }
    let typeName = this.types.find(t => t.id == this.typeFilter).name;
    return !!pokemon.types.find((type) => {
      return type.name == typeName.toLocaleLowerCase()
    });
  }
}

HomeController.$inject = ['pokeApi', '$uibModal'];

export { HomeController };
