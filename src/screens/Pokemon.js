import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getPokemonsDetailApi } from "../api/pokemon";
import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Stats";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props; //destructurando, porque cada screen de pokemon se activa con navigation
  //route: trae info importante de pokemon, enviado por navigation al selec un pokemon

  const [pokemon, setPokemon] = useState(null);

  //setOptions: permite modificar el header de un Stack.Screen
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={25}
          style={{ marginLeft: 5, marginBottom: 20 }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, params]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonsDetailApi(params.id);
        setPokemon(response);
      } catch (err) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;
  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        id={pokemon.id}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
