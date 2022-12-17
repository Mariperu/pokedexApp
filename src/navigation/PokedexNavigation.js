import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../screens/Pokedex";
import PokemonScreen from "../screens/Pokemon";

// nav component, con arrow  para retornar al inicio

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{
          title: "", //para quitar de la parte superior
          headerTransparent: true,
        }}
        // options={{ headerShown: false }}//si es con stack, ya nomuestra la flecha
      />
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{
          title: "", //para quitar de la parte superior
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
