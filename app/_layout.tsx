import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import * as Font from "expo-font";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load custom fonts
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return <View />;
  }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/add-customer"
          options={{
            title: "Add Customer",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
            },
          }}
        />
        <Stack.Screen
          name="screens/manage-customer"
          options={{
            title: "Manage Customer",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
            },
          }}
        />
        <Stack.Screen
          name="screens/add-product"
          options={{
            title: "Add Product",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
            },
          }}
        />
          <Stack.Screen
          name="screens/manage-product"
          options={{
            title: "Manage Product",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
            },
          }}
        />
      </Stack>
  );
}
