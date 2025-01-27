import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store";

import { Creature } from "./Creatures";
import { CharacterDetail } from "./CharacterDetail";
import { Settings } from "./Settings";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Creatures" component={Creature} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
