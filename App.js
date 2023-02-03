import * as React from "react";
import { StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Post from "./screens/Post";
import Calendar from "./screens/Calendar";
import Event from "./screens/Event";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#fafafa" },
          labelVisible: false,
          headerStyle: {
            backgroundColor: "#1a2a5a",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back-outline" size={30} color="#fafafa" />
            </TouchableOpacity>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

function CalendarStackScreen({ navigation }) {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#fafafa" },
          labelVisible: false,
          headerStyle: {
            backgroundColor: "#1a2a5a",
          },
        }}
      />
      <CalendarStack.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#fafafa" },
          labelVisible: false,
          headerStyle: {
            backgroundColor: "#1a2a5a",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Calendar")}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back-outline" size={30} color="#fafafa" />
            </TouchableOpacity>
          ),
        }}
      />
    </CalendarStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "#0d152d" } }}>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "#0d152d",
            borderTopColor: "#121212",
            paddingVertical: 2,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          headerShown: true,
          headerTitleStyle: { color: "#fafafa" },
          headerStyle: {
            backgroundColor: "#1a2a5a",
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <TouchableOpacity style={styles.tabIcon}>
                  <AntDesign name="home" size={size} color={color} />
                </TouchableOpacity>
              ) : (
                <AntDesign name="home" size={size} color={color} />
              ),
          }}
        />

        <Tab.Screen
          name="CalendarScreen"
          component={CalendarStackScreen}
          options={{
            title: "Calendar",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <TouchableOpacity style={styles.tabIcon}>
                  <Feather name="calendar" size={size} color={color} />
                </TouchableOpacity>
              ) : (
                <Feather name="calendar" size={size} color={color} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <TouchableOpacity style={styles.tabIcon}>
                  <Feather name="user" size={size} color={color} />
                </TouchableOpacity>
              ) : (
                <Feather name="user" size={size} color={color} />
              ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <TouchableOpacity style={styles.tabIcon}>
                  <Feather name="settings" size={size} color={color} />
                </TouchableOpacity>
              ) : (
                <Feather name="settings" size={size} color={color} />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#3A3A3C",
    borderRadius: "100%",
    paddingHorizontal: 2,
    paddingVertical: 1,
    marginLeft: 20,
  },
  tabIcon: {
    backgroundColor: "#273f87",
    padding: 5,
    borderRadius: 14,
  },
});

export default App;
