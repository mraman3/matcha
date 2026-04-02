import "react-native-gesture-handler";
import { useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import DiscoverScreen from "./src/screens/DiscoverScreen";
import CafeDetailScreen from "./src/screens/CafeDetailScreen";
import CreateEntryScreen from "./src/screens/CreateEntryScreen";
import PassportScreen from "./src/screens/PassportScreen";
import AddCafeScreen from "./src/screens/AddCafeScreen";
import BirthdaySplashScreen from "./src/components/BirthdaySplashScreen";

import {
  DiscoverStackParamList,
  RootTabParamList,
} from "./src/types/navigation";

const DiscoverStack = createNativeStackNavigator<DiscoverStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="DiscoverHome"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <DiscoverStack.Screen
        name="CafeDetail"
        component={CafeDetailScreen}
        options={{ headerShown: false }}
      />
      <DiscoverStack.Screen
        name="CreateEntry"
        component={CreateEntryScreen}
        options={{ headerShown: false }}
      />
      <DiscoverStack.Screen
        name="AddCafe"
        component={AddCafeScreen}
        options={{ headerShown: false }}
      />
    </DiscoverStack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Handwritten: require("./assets/fonts/Handwritten.ttf"),
    SerifDisplay: require("./assets/fonts/SerifDisplay.ttf"),
  });

  const [showBirthdaySplash, setShowBirthdaySplash] = useState(true);

  if (!fontsLoaded) return null;

  if (showBirthdaySplash) {
    return <BirthdaySplashScreen onFinish={() => setShowBirthdaySplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "rgba(255,253,248,0.96)",
            borderTopColor: "#DDD4C6",
            borderTopWidth: 1,
            height: 60,
            paddingTop: 0,
            paddingBottom: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
            fontWeight: "500",
          },
          tabBarActiveTintColor: "#7C8B6A",
          tabBarInactiveTintColor: "#8E867C",
          tabBarIcon: ({ color, focused, size }) => {
            let iconName: keyof typeof Feather.glyphMap = "circle";

            if (route.name === "DiscoverTab") {
              iconName = "compass";
            } else if (route.name === "PassportTab") {
              iconName = "book-open";
            }

            return (
              <Feather
                name={iconName}
                size={18}
                color={color}
                style={{
                  opacity: focused ? 1 : 0.85,
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="DiscoverTab"
          component={DiscoverStackNavigator}
          options={{ title: "Discover" }}
        />
        <Tab.Screen
          name="PassportTab"
          component={PassportScreen}
          options={{ title: "Passport" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}