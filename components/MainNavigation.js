/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Series from '../screens/Series';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'black' },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => {
                        return <Icon name="home-outline" color="white" size={30} />;
                    },
                    tabBarActiveTintColor: '#02ad94',
                }}
            />
            <Tab.Screen
                name="TV Shows"
                component={Series}
                options={{
                    tabBarIcon: () => {
                        return <Icon name="tv-outline" color="white" size={30} />;
                    },
                    tabBarActiveTintColor: '#02ad94',
                }}
            />
        </Tab.Navigator>)

};

export default MainNavigation