import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { RootState } from "@/redux/Store";
import colors from "@/constants/colors";
import { addToCart, removeFromCart, updateQuantity, clearCart } from "@/redux/slice/CartSlice";
import {addOrder} from "@/redux/slice/PlaceOrderSlice";
import { AntDesign } from "@expo/vector-icons";
import { OrderModel } from "@/model/OrderModel";
import { OrderDetailModel } from "@/model/OrderDetailModel";
import uuid from "react-native-uuid";

export default function Cart() {
  const dispatch = useDispatch();

  const customers = useSelector((state: RootState) => state.customer);
  const items = useSelector((state: RootState) => state.item);
  const cartItems = useSelector((state: RootState) => state.cart);

  const [customerOpen, setCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerList, setCustomerList] = useState([]);

  const [itemOpen, setItemOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setCustomerList(customers.map((customer) => ({ label: customer.name, value: customer.id })));
    setItemList(items.map((item) => ({ label: item.name, value: item.id })));
  }, [customers, items]);

  const handleItemSelect = (value: any) => {
    const selectedProduct = items.find((i) => i.id === value);
    if (selectedProduct) {
      dispatch(addToCart({ ...selectedProduct, quantity: 1 }));
    }
    setSelectedItem(null);
  };

  const handleIncrease = (id: number) => dispatch(updateQuantity({ id, change: 1 }));
  const handleDecrease = (id: number) => dispatch(updateQuantity({ id, change: -1 }));
  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!selectedCustomer) {
      Alert.alert("Error", "Please select a customer before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Error", "Cart is empty. Add items before placing an order.");
      return;
    }

    const orderId = uuid.v4().toString();
    const newOrder = new OrderModel(orderId, selectedCustomer, totalPrice);

    const orderDetails = cartItems.map(
        (item) => new OrderDetailModel(uuid.v4().toString(), orderId, item.id, item.quantity, item.price)
    );

    dispatch(addOrder({ order: newOrder, orderItems: orderDetails }));
    dispatch(clearCart());

    Alert.alert("Success", "Order placed successfully!");
  };

  return (
      <View style={styles.container}>
        {customerList.length > 0 && (
            <>
              <Text style={styles.inputTitle}>Select Customer</Text>
              <DropDownPicker
                  open={customerOpen}
                  value={selectedCustomer}
                  items={customerList}
                  setOpen={setCustomerOpen}
                  setValue={setSelectedCustomer}
                  setItems={setCustomerList}
                  placeholder="Select a Customer"
                  style={styles.input}
                  dropDownContainerStyle={styles.customerDropdownContainer}
                  listMode="SCROLLVIEW"
              />
            </>
        )}

        {itemList.length > 0 && (
            <>
              <Text style={styles.inputTitle}>Select Product</Text>
              <DropDownPicker
                  open={itemOpen}
                  value={selectedItem}
                  items={itemList}
                  setOpen={setItemOpen}
                  setValue={setSelectedItem}
                  setItems={setItemList}
                  onChangeValue={handleItemSelect}
                  placeholder="Select a Product"
                  style={styles.input}
                  dropDownContainerStyle={styles.itemDropdownContainer}
                  listMode="SCROLLVIEW"
              />
            </>
        )}

        <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleDecrease(item.id)}>
                      <AntDesign name="minuscircle" size={24} color="red" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrease(item.id)}>
                      <AntDesign name="pluscircle" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                </View>
            )}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>Rs {totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  inputTitle: { fontSize: 14, fontWeight: "bold", color: colors.black, marginBottom: 6 },
  input: { borderColor: colors.primary, borderWidth: 2, borderRadius: 8, paddingHorizontal: 10, minHeight: 50 },
  dropdown: { borderColor: colors.primary, borderWidth: 1.5, borderRadius: 8 },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.pane,
    borderRadius: 8,
    marginVertical: 5,
  },
  productName: { fontSize: 16, fontWeight: "bold" },
  quantityContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  quantityText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingVertical: 10,
    marginTop: 20,
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalPrice: { fontSize: 20, fontWeight: "bold" },
  placeOrderButton: { backgroundColor: "green", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  placeOrderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  customerDropdownContainer: {
    zIndex: 10000,
    elevation: 10,
  },
  itemDropdownContainer: {
    zIndex: 2000,
    elevation: 9,
  },
});
