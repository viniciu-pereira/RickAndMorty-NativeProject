import React from 'react';
import { Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import CreateUser from './pages/user';
import Main from './pages/characters';
import CardDetail from './pages/detail';

const Stack = createStackNavigator();

export default function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2397B6',
                        height: 75
                    }
                }}
            >
                <Stack.Screen name="login" component={Login} options={{
                    title: 'LOGIN',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }} />
                <Stack.Screen name="characters" component={Main} options={{
                    title: 'CARDS',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }}
                />
                <Stack.Screen name="detail" component={CardDetail} options={({ route }) => ({
                    title: route.params?.character?.name.toUpperCase() || 'DETALHE',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                })}
                />
                <Stack.Screen name="user" component={CreateUser} options={{
                    title: 'CADASTRAR USUÁRIO',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
