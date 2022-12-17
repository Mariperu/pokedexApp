import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemons, loadPokemons, isNext }) {
  const loadMore = () => {
    loadPokemons();
  };

  //FlatList: componente para ahcer listas
  //Platform: para identificar sist operativo // console.log(Platform);
  // Si componente padre tiene View, en hijo no es necesario usarlo
  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false} //false: no muestra barra scroll
      //ketExtractor={(pokemon) => String(pokemon.id)}
      keyExtractor={(pokemon, index) => String(index)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      constenContainerStyle={styles.flatListContentContainer}
      onEndReached={isNext && loadMore} // si existe mas data, continua trayendo
      onEndReachedThreshold={0.1} //valor indica el tiempo (s) que se anticipa para ir llamando más data
      //Spinner: ActivityIndicator
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#aeaeae"
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 80 : 60,
  },
});
