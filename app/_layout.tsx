import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import * as Font from "expo-font";

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
        </Stack>
    );
}
