//AsyncStorage: tiene la misma acción que loca, storage en web
import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { FAVORITE_STORAGE } from "../utils/constants";

//Funcion para obtener favoritos (traer de storage)
export async function getPokemonsFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response || "[]");
    // response ? JSON.parse(response) : [];
  } catch (error) {
    throw error;
  }
}

//Funcion para añadir un id a favoritos (guardar en storage)
export async function addPokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    favorites.push(id);
    //guardando array [] como string, en storage
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
}

//Func. para obtener lista de pokemons,verificar si ya existe y no repita id
export async function isPokemonFavoriteApi(id) {
  try {
    const response = await getPokemonsFavoriteApi();
    //(array , valor buscado), includes: devuelve true/false
    return includes(response, id);
  } catch (error) {
    throw error;
  }
}

//Func. para obtener lista de pokemons,verificar si ya existe y no repita id
export async function removePokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    //pull: elimina items de array,  (array de un solo nivel, item a eliminar)
    const newFavorites = pull(favorites, id);
    //Reemplazando por nuevo array y pasando como string para storage
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
}
