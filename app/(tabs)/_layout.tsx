import { Tabs } from "expo-router";
import colors from "@/constants/colors";
import { Feather, Octicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.white,
          height: 80,
          paddingBottom: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 20,
          justifyContent: "center",
        },
        tabBarItemStyle: {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarInactiveTintColor: colors.white,
        tabBarActiveTintColor: colors.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.primary : "transparent",
                borderRadius: 30,
                width: 50,
                height: 50,
              }}
            >
              <Feather
                name="home"
                size={size}
                color={focused ? colors.white : colors.black}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="customer"
        options={{
          headerTitle: "Customers",
          title: "Customers",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.primary : "transparent",
                borderRadius: 30,
                width: 50,
                height: 50,
              }}
            >
              <Octicons
                name="people"
                size={size}
                color={focused ? colors.white : colors.black}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          headerTitle: "Products",
          title: "Products",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.primary : "transparent",
                borderRadius: 30,
                width: 50,
                height: 50,
              }}
            >
              <Feather
                name="shopping-bag"
                size={size}
                color={focused ? colors.white : colors.black}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "Place Order",
          title: "Place Order",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.primary : "transparent",
                borderRadius: 30,
                width: 50,
                height: 50,
              }}
            >
              <Feather
                name="shopping-cart"
                size={size}
                color={focused ? colors.white : colors.black}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          headerTitle: "Orders",
          title: "Orders",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.primary : "transparent",
                borderRadius: 30,
                width: 50,
                height: 50,
              }}
            >
              <Octicons
                name="checklist"
                size={size}
                color={focused ? colors.white : colors.black}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
