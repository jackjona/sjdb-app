import React from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/Home";
import PostScreen from "./src/screens/Post";
import CalendarScreen from "./src/screens/Calendar";
import EventDetailsScreen from "./src/screens/EventDetails";
import ProfileScreen from "./src/screens/Profile";
import SettingsScreen from "./src/screens/Settings";
import OurSchoolScreen from "./src/screens/OurSchool";
import LicensesScreen from "./src/screens/Licenses";
import theme from "./src/theme";

const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      console.log(e);
      return "light";
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem("@color-mode", value);
    } catch (e) {
      console.log(e);
    }
  },
};

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Post"
        component={PostScreen}
        options={{
          title: "",
          headerShown: true,
          labelVisible: false,
          headerTitleStyle: { color: "#fafafa" },
          headerStyle: {
            backgroundColor: "#004282",
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color="#fafafa" />
            </Pressable>
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
        component={CalendarScreen}
        options={{
          headerShown: false,
          labelVisible: false,
        }}
      />
      <CalendarStack.Screen
        name="Event"
        component={EventDetailsScreen}
        options={{
          title: "",
          headerShown: true,
          labelVisible: false,
          headerTitleStyle: { color: "#fafafa" },
          headerStyle: {
            backgroundColor: "#004282",
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color="#fafafa" />
            </Pressable>
          ),
        }}
      />
    </CalendarStack.Navigator>
  );
}

function SettingsStackScreen({ navigation }) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          labelVisible: false,
        }}
      />
      <SettingsStack.Screen
        name="OurSchool"
        component={OurSchoolScreen}
        options={{
          title: "",
          headerShown: true,
          labelVisible: false,
          headerTitleStyle: { color: "#fafafa" },
          headerStyle: {
            backgroundColor: "#004282",
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="chevron-back-outline" size={30} color="#fafafa" />
            </Pressable>
          ),
        }}
      />
      <SettingsStack.Screen
        name="Licenses"
        component={LicensesScreen}
        options={{
          title: "",
          headerShown: true,
          labelVisible: false,
          headerTitleStyle: { color: "#fafafa" },
          headerStyle: {
            backgroundColor: "#004282",
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="chevron-back-outline" size={30} color="#fafafa" />
            </Pressable>
          ),
        }}
      />
    </SettingsStack.Navigator>
  );
}

function App() {
  return (
    /*     <NavigationContainer theme={{ colors: { background: "#002851" } }}> */
    <NavigationContainer>
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
        <StatusBar barStyle="light-content" />
        <Tab.Navigator
          initialRouteName={"Home"}
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              display: "flex",
              backgroundColor: "#002851",
              borderTopColor: "#002851",
              paddingVertical: 6,
            },

            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            headerTitleStyle: { color: "#fafafa" },
            headerStyle: {
              backgroundColor: "#004282",
            },
          }}
        >
          <Tab.Screen
            name="Home Screen"
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
            name="Calendar Screen"
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
            component={ProfileScreen}
            options={{
              headerShown: false,
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
            name="Settings Screen"
            component={SettingsStackScreen}
            options={{
              headerShown: false,
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
      </NativeBaseProvider>
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
