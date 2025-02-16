import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

export default function Index() {
  const customersLength = useSelector((state: RootState) => state.customer.length);
  const itemsLength = useSelector((state: RootState) => state.item.length);
  const orders = useSelector((state: RootState) => state.order);
  const ordersLength = orders.orders.length;
  const totalRevenue = orders.orders.reduce((acc, order) => acc + order.totalAmount, 0);
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>TransactX</Text>
        </View>
        <Text style={styles.totalLabel}>Total Revenue</Text>
        <Text style={styles.totalValue}>RS {totalRevenue.toLocaleString()}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customers</Text>
          <Text style={styles.cardValue}>{String(customersLength).padStart(4, "0")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items</Text>
          <Text style={styles.cardValue}>{String(itemsLength).padStart(4, "0")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={styles.cardValue}>{String(ordersLength).padStart(4, "0")}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8C00",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  card: {
    width: "100%",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#FFC94C",
    borderRadius: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
});
