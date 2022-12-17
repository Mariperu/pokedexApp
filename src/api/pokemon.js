import { API_HOST } from "../utils/constants";

export async function getPokemonsApi(endpointUrl) {
  try {
    //20 pokemons por pag, desde pokemmon 0
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    const response = await fetch(endpointUrl || url); //primero ejecuta url, luego nuevo endpoint
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonsDetailByUrlApi(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonsDetailApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
