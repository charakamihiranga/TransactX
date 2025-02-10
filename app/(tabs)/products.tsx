import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FAB, Searchbar } from "react-native-paper";
import colors from "@/constants/colors";
import ItemModel from "@/model/ItemModel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import ItemCard from "@/components/ItemCard";
import { MaterialIcons } from "@expo/vector-icons";

export default function Products() {
  const router = useRouter();
  const items: ItemModel[] = useSelector((state: RootState) => state.item);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Products"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.input}
      />
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard item={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.noItems}>
          <MaterialIcons name="inventory" size={80} color="gray" />
          <Text style={styles.noItemsText}>No Items Found</Text>
        </View>
      )}
      <FAB
        icon="clipboard-plus"
        style={styles.fab}
        onPress={() => router.push("/screens/add-product")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchbar: {
    marginVertical: 10,
    alignSelf: "center",
  },
  input: {
    fontSize: 15,
  },
  list: {
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    marginTop: 10,
    fontSize: 18,
    color: "gray",
  },
});
