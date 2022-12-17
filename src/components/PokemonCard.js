import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback, // clic a un pokemon y luego acceder a la info
} from "react-native";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";
import getColorByPokemonType from "../utils/getColorByPokemonType";

export default function PokemonCard({ pokemon }) {
  const navigation = useNavigation();

  const pokemonColor = getColorByPokemonType(pokemon.type);
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles }; //...styles.bgStyles: ...  adiciona los estilos + los ya indicados

  const goToPokemon = () => {
    navigation.navigate("Pokemon", { id: pokemon.id }); //se indica el nombre del screen a donde quieres ir, a continuación los parámetros en obj (solo datos planos, no func, ni img, etc)
  };

  //padStart: fija 3 digitos en numeros, ejem: 006 o 151
  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>#{`${pokemon.id}`.padStart(3, 0)}</Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
    // shadowColor: "#171717",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  number: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 11,
    color: "#fff",
  },
  name: {
    color: "#fff",
    paddingTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
});
