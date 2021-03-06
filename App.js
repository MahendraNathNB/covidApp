import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './Routes/Hometsack';
import PractionerStack from './Routes/PractionerStack';
import Header from './Screens/Header';
import Ionicons from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();

function PatientView() {
  return <Navigator />;
}

function DoctorView() {

  return <PractionerStack />;
}

function HomeStackScreen({ navigation, route }) {
  console.log('navigation>>>>>>>>>>>>', route.state)
  navigation.setOptions({ tabBarVisible: true })
  setTimeout(function () { navigation.setOptions({ tabBarVisible: false }) }, 10500);
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName="Patient Login">
      <HomeStack.Screen
        name="Patient Login"
        component={PatientView}
        screenOptions={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen({ navigation, route }) {
  console.log('navigation>>>>>>>>>>>>', route.state)
  navigation.setOptions({ tabBarVisible: true })
  setTimeout(function () { navigation.setOptions({ tabBarVisible: false }) }, 10500);
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <SettingsStack.Screen
        name="Provider Login"
        component={DoctorView}
      />
    </SettingsStack.Navigator>
  );
}
export default function App() {
  return (
    <>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Patient Login') {
              iconName = focused
                ? 'bed-patient'
                : 'bed-patient';
            } else if (route.name === 'Provider Login') {
              iconName = focused ? 'doctor' : 'doctor';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1DDCAF',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Patient Login" component={HomeStackScreen} />
          <Tab.Screen name="Provider Login" component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

