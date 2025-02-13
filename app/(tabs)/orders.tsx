import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { OrderModel } from "@/model/OrderModel";
import { OrderDetailModel } from "@/model/OrderDetailModel";

interface OrderWithDetails extends OrderModel {
  orderDetails: OrderDetailModel[];
}

export default function Orders() {
  const data = {
    orders: [],
    orderDetails: {},
  };

  const { orders, orderDetails } = data;
  const customers: any[] = [];
  const items: any[] = [];

  // // Combine orders with their details
  // const ordersWithDetails: OrderWithDetails[] = orders.map(order => ({
  //   ...order,
  //   orderDetails: orderDetails.filter(detail => detail.orderId === order.id),
  // }));

  // Helper to get customer name by ID
  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : "Unknown Customer";
  };

  // Helper to get item name by ID
  const getItemName = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.name : "Unknown Item";
  };

  // Delete confirmation
  const confirmDelete = (orderId: string) => {
    Alert.alert(
        "Delete Order",
        "Are you sure you want to delete this order?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => console.log(orderId)
          },
        ],
        { cancelable: true }
    );
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Orders</Text>

        {/*{ordersWithDetails.length === 0 ? (*/}
        {/*    <Text style={styles.noOrdersText}>No orders found</Text>*/}
        {/*) : (*/}
        {/*    <FlatList*/}
        {/*        data={ordersWithDetails}*/}
        {/*        keyExtractor={(item) => item.id}*/}
        {/*        renderItem={({ item }) => (*/}
        {/*            <View style={styles.orderCard}>*/}
        {/*              <Text style={styles.orderText}>Order ID: {item.id}</Text>*/}
        {/*              <Text style={styles.orderText}>Customer: {getCustomerName(item.customerId)}</Text>*/}
        {/*              <Text style={styles.orderText}>Date: {new Date(item.date).toLocaleString()}</Text>*/}
        {/*              <Text style={styles.orderText}>Total Amount: Rs {item.totalAmount.toFixed(2)}</Text>*/}

        {/*              <Text style={styles.orderDetailsHeader}>Order Details:</Text>*/}
        {/*              {item.orderDetails.map((detail) => (*/}
        {/*                  <View key={detail.id} style={styles.orderDetailItem}>*/}
        {/*                    <Text style={styles.detailText}>Item: {getItemName(detail.itemId)}</Text>*/}
        {/*                    <Text style={styles.detailText}>Quantity: {detail.quantity}</Text>*/}
        {/*                    <Text style={styles.detailText}>Price: Rs {detail.price.toFixed(2)}</Text>*/}
        {/*                  </View>*/}
        {/*              ))}*/}

        {/*              <TouchableOpacity*/}
        {/*                  style={styles.deleteButton}*/}
        {/*                  onPress={() => confirmDelete(item.id)}*/}
        {/*              >*/}
        {/*                <Text style={styles.deleteButtonText}>Delete</Text>*/}
        {/*              </TouchableOpacity>*/}
        {/*            </View>*/}
        {/*        )}*/}
        {/*    />*/}
        {/*)}*/}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  orderCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  orderDetailsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
  },
  orderDetailItem: {
    marginTop: 8,
    paddingLeft: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
