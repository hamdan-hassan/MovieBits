/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { SafeAreaView, } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './components/MainNavigation'

import Details from './screens/Details';
import ViewAll from './screens/ViewAll';
import Results from './screens/Results'



import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main Navigation" component={MainNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={Details}

            options={{

              headerShown: false,
              contentStyle: {
                backgroundColor: "black"
              }
            }}
          />
          <Stack.Screen name="ViewAll" component={ViewAll}
            options={{

              headerShown: false,
              contentStyle: {
                backgroundColor: "black"
              }
            }}
          />
          <Stack.Screen name="Results" component={Results}
            options={{

              headerShown: false,
              contentStyle: {
                backgroundColor: "black"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer >
    </SafeAreaProvider>
  );
};

export default App;
