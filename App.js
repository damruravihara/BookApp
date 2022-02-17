/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import CreateGoalActivity from './App/Activities/CreateGoalActivity'
import LoginActivity from './App/Activities/LoginActivity'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeAcvtivity from './App/Activities/HomeAcvtivity'
import GoalDetails from './App/Activities/GoalDetails'
import AllGoals from './App/Activities/AllGoals'
import AllBooks from './App/Activities/AllBooks'
import BookDetail from './App/Activities/BookDetail'
import RegisterActivity from './App/Activities/RegisterActivity'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginActivity} />
        <Stack.Screen name='Register' component={RegisterActivity} />
        <Stack.Screen name='Home' component={HomeAcvtivity} />
        <Stack.Screen name='Goal' component={CreateGoalActivity} />
        <Stack.Screen name='GoalDetails' component={GoalDetails} />
        <Stack.Screen name='AllGoals' component={AllGoals} />
        <Stack.Screen name='AllBooks' component={AllBooks} />
        <Stack.Screen name='BookDetail' component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
    // <LoginActivity/>
  )
}

export default App

const styles = StyleSheet.create({})