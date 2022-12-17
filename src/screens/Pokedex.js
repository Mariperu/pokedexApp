import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonsApi, getPokemonsDetailByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null); //estado para llamar a los sig 20 datos

  useEffect(() => {
    //funcion anónima auto ejecutada ()();
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonsDetailByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          //order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  //SafeAreaView: ayuda en android a que el contenido vaya debajo de las notificaciones del mobile
  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl} // sirve para verificar qeu llegue al final y no siga esperando mas data
      />
    </SafeAreaView>
  );
}
