  import { useLocalSearchParams, useRouter } from "expo-router";
  import CustomerModel from "@/model/CustomerModel";
  import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
  } from "react-native";
  import colors from "@/constants/colors";
  import { Button, TextInput } from "react-native-paper";
  import { useState, useEffect } from "react";
  import { Alert } from "react-native";

  export default function ManageCustomer() {
    const { id } = useLocalSearchParams();
    const customers: CustomerModel[] =[];
    const customer = customers.find((c) => c.id === id);
    const router = useRouter();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Populate customer fields
    useEffect(() => {
      if (customer) {
        setName(customer.name);
        setAddress(customer.address);
        setEmail(customer.email);
        setPhone(customer.phone);
      }
    }, [customer]);

    function updateCustomerOnAction() {
      if (!name || !email || !address || !phone) {
        alert("All fields are required!");
        return;
      }
      const updatedCustomer = new CustomerModel(
        id as string,
        name,
        email,
        address,
        phone
      );
      console.log(updatedCustomer);
      alert("Customer updated successfully!");
      router.back();
    }

    function deleteCustomer() {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this customer?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              console.log(id as string);
              router.back();
            },
          },
        ]
      );
    }

    if (!customer) {
      return (
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView contentContainerStyle={styles.innerContainer}>
            <Button
              mode="contained"
              onPress={() => router.back()}
              style={styles.backButton}
            >
              Go Back
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Address"
            mode="outlined"
            style={styles.textInput}
            value={address}
            onChangeText={setAddress}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Phone"
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.textInput}
            value={phone}
            onChangeText={setPhone}
            theme={{ colors: { primary: colors.primary } }}
          />

          <Button
            mode="contained"
            onPress={updateCustomerOnAction}
            style={[styles.button, styles.updateButton]}
          >
            Update
          </Button>
          <Button
            mode="contained"
            onPress={deleteCustomer}
            style={[styles.button, styles.deleteButton]}
          >
            Delete
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    innerContainer: {
      flexGrow: 1,
      marginTop: 40,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    textInput: {
      width: "100%",
      marginBottom: 15,
      overflow: "hidden",
    },
    button: {
      width: "100%",
      marginTop: 10,
      paddingVertical: 5,
      borderRadius: 8,
    },
    updateButton: {
      backgroundColor: "orange",
    },
    deleteButton: {
      backgroundColor: "red",
    },
    backButton: {
      backgroundColor: colors.primary,
      marginTop: 20,
    },
  });
