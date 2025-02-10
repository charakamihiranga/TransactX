import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { addItem } from "@/redux/slice/ItemSlice";
import ItemModel from "@/model/ItemModel";
import { generateId } from "@/util/IdGenerator";

export default function AddProduct() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Function to pick an image and convert to Base64
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

  function addItemOnAction() {
    if (!name || !price || !quantity || !description || !category) {
      alert("All fields are required!");
      return;
    }

    const newProduct = new ItemModel(
      generateId("PROD"),
      name,
      parseFloat(price),
      description,
      category,
      image,
      parseInt(quantity)
    );

    dispatch(addItem(newProduct));
    alert("Product added!");
    router.back();
    1500;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {/* Image Picker */}
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <MaterialIcons name="add-a-photo" size={40} color="gray" />
            </View>
          )}
        </TouchableOpacity>

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
          keyboardType="default"
          style={styles.textInput}
          value={category}
          onChangeText={setCategory}
          theme={{ colors: { primary: colors.primary } }}
        />
        <TextInput
          label="Description"
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          style={[styles.textInput, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          theme={{ colors: { primary: colors.primary } }}
        />
        <Button
          mode="contained"
          onPress={addItemOnAction}
          style={styles.button}
        >
          Save Product
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  innerContainer: {
    flexGrow: 1,
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textInput: { width: "100%", marginBottom: 15 },
  button: { width: "100%", marginTop: 10, backgroundColor: colors.primary },
  imageContainer: {
    width: "100%",
    height: "36%",
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
