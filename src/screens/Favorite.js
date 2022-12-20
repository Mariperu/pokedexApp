import React, { useState, useEffect, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../../src/hooks/useAuth";
import { getPokemonsFavoriteApi } from "../../src/api/favorite";
import { getPokemonsDetailApi } from "../api/pokemon";
import PokemonList from "../../src/components/PokemonList";
import NoLogged from "../components/NoLogged";
export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);

  const { auth } = useAuth();

  //Combinación para actualizar información en tiempo real, sin recargar
  //useFocusEffect(useCallback(() => {}, []));
  //useCallback: tiene misma estructura de useEffect
  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonsFavoriteApi();

          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonsDetailApi(id);
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }

          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />;
}
