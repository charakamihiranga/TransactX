import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomerModel from "@/model/CustomerModel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useRouter } from "expo-router";
import { FAB, List, Searchbar } from "react-native-paper";
import colors from "@/constants/colors";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Customer() {
  const router = useRouter();
  const customers: CustomerModel[] = useSelector(
    (state: RootState) => state.customer
  );
  const [searchQuery, setSearchQuery] = useState("");
  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Customers"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.input}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.email}
              left={() => <List.Icon icon="account-circle" />}
              style={styles.listItem}
              titleStyle={styles.listItemTitle}
              descriptionStyle={styles.listItemDescription}
              onPress={() =>
                router.push(`/screens/manage-customer?id=${item.id}`)
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="people-outline"
                size={60}
                color={colors.gray}
              />
              <Text style={styles.emptyText}>No customers found</Text>
            </View>
          }
          contentContainerStyle={
            filteredCustomers.length === 0 ? styles.emptyList : undefined
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FAB
        icon="account-plus"
        style={styles.fab}
        onPress={() => router.push("/screens/add-customer")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
    marginTop: "36%",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "#333",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 10,
    fontFamily: "Poppins-Regular",
  },
  searchbar: {
    position: "absolute",
    top: 36,
    alignSelf: "center",
    zIndex: 1,
  },
  input: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  listItemTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  listItemDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
