import 'babel-polyfill'; // for async/await

const pokeApi = ($http, $q, constants) => {

  const { pokemon_api_url: apiUrl } = constants;

  const pad = (number, length) => {
      let str = '' + number;
      while (str.length < length) {
          str = '0' + str;
      }
      return str;
  };
  /**
   * Returns a list of Pokemon based on optional `limitTo` and `offset`
   */
  const getPokemons = ({limitTo = 12, offset = 0} = {}) => {
      let favorite = getFavorite();

        return $http.get(`${apiUrl}/api/v1/pokemon/?limit=${limitTo}&offset=${offset}`)
            .then((res) => {
                if (!res.data || !res.data.objects) {
                    return []
                }
                return res.data.objects.map( (pokemon) => {
                    return  {
                        id: pokemon.national_id,
                        name: pokemon.name,
                        types: pokemon.types,
                        // The owner of this website (pokeapi.co) does not allow
                        // hotlinking to that resource (/media/img/8.png).
                        pic: `http://pokeunlock.com/wp-content/uploads/2015/01/${pad(pokemon.national_id, 3)}-80x80.png`,
                        favorite: !!favorite.find(p => p.id == pokemon.national_id)
                    }
                })
            });
  };

  /**
   * Gets a single pokemon by id.
   */
  const getPokemon = id => {
      return $http.get(`${apiUrl}/api/v1/pokemon/${id}`)
          .then((res) => {
              if (!res.data) {
                  return null
              }
              const pokemon = res.data;
              return {
                  id: pokemon.national_id,
                  name: pokemon.name,
                  types: pokemon.types,
                  pic: `http://pokeunlock.com/wp-content/uploads/2015/01/${pad(pokemon.national_id, 3)}-80x80.png`,
                  attack: pokemon.attack,
                  defense: pokemon.defense,
                  abilities: pokemon.abilities
              }
          });
  };

  const getTypes = () => {
      return $http.get(`${apiUrl}/api/v1/type/?limit=999`)
          .then((res) => {
              if (!res.data || !res.data.objects) {
                  return null
              }
              let types = res.data.objects.map( type => {
                  return  {
                      id: type.id,
                      name: type.name
                  }
              });
              types.unshift({id: 0, name: "No filter"})
              return types;
          });
  };

  const getFavorite = () => {
      // simplest manual approach
      if (!localStorage) {
          return [];
      }
      return JSON.parse(localStorage.getItem('favorite') || '[]');
  };
  const saveFavorite = (newPokemon) => {
      // simplest manual approach
      let favorite = getFavorite();
      let oldOne = favorite.findIndex(p => p.id == newPokemon.id);
      if (oldOne != -1 && !newPokemon.favorite) {
          favorite.splice(oldOne, 1);
      }
      else if (oldOne == -1 && newPokemon.favorite) {
          favorite.push(newPokemon)
      }
      localStorage.setItem('favorite', JSON.stringify(favorite));
  };

  // member functions
  return { getPokemons, getPokemon, getTypes, saveFavorite, getFavorite };
};

pokeApi.$inject = ['$http', '$q', 'constants'];

export { pokeApi };
