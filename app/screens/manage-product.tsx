import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import ItemModel from "@/model/ItemModel";

export default function ManageProduct() {
  const { id } = useLocalSearchParams();
  const items: ItemModel[] = [];
  const item = items.find((i) => i.id === id);
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toString());
      setQuantity(item.qty.toString());
      setDescription(item.description);
      setCategory(item.category);
      setImage(item.image);
    }
  }, [item]);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    }
  }

  function updateItemOnAction() {
    if (!name || !price || !quantity || !description || !category) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const updatedProduct = new ItemModel(
      id as string,
      name,
      parseFloat(price),
      description,
      category,
      image,
      parseInt(quantity)
    );

    console.log(updatedProduct);
    Alert.alert("Success", "Product updated!");
    router.back();
  }

  function deleteItemOnAction() {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log(id)
            Alert.alert("Deleted", "Product deleted!");
            router.back();
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* IMAGE PICKER */}
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <MaterialIcons name="add-a-photo" size={40} color="gray" />
            </View>
          )}
        </TouchableOpacity>

        {/* INPUT FIELDS */}
        <View style={styles.form}>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Price"
            mode="outlined"
            keyboardType="numeric"
            style={styles.textInput}
            value={price}
            onChangeText={(value) => setPrice(value.replace(/[^0-9.]/g, ""))}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Quantity"
            mode="outlined"
            keyboardType="numeric"
            style={styles.textInput}
            value={quantity}
            onChangeText={(value) => setQuantity(value.replace(/[^0-9]/g, ""))}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Category"
            mode="outlined"
            style={styles.textInput}
            value={category}
            onChangeText={setCategory}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Description"
            mode="outlined"
            multiline
            numberOfLines={4}
            style={[styles.textInput, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            theme={{ colors: { primary: colors.primary } }}
          />
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={updateItemOnAction}
            style={styles.button}
          >
            Update
          </Button>
          <Button
            mode="contained"
            onPress={deleteItemOnAction}
            style={[styles.button, styles.deleteButton]}
          >
            Delete
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageContainer: {
    width: "90%",
    height: 250,
    alignSelf: "center",
    marginBottom: 15,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "gray",
    borderStyle: "dashed",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  form: {
    paddingHorizontal: 20,
  },
  textInput: {
    width: "100%",
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    width: "100%",
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});
