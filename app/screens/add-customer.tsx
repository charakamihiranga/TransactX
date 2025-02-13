import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import colors from "@/constants/colors";
import { useState } from "react";
import { useRouter } from "expo-router";
import {useDispatch} from "react-redux";
import {addCustomer} from "@/redux/slice/CustomerSlice";
import CustomerModel from "@/model/CustomerModel";
import {generateId} from "@/util/IdGenerator";

export default function AddCustomer() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    function addCustomerOnAction() {
        if (!name || !email || !address || !phone) {
            alert("All fields are required!");
            return;
        }
        const customer = new CustomerModel(
            generateId("CUST"),
            name,
            email,
            address,
            phone
        );
        dispatch(addCustomer(customer));
        alert("Customer saved successfully!");
        router.push("/(tabs)/customer");
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

                <Button mode="contained" onPress={addCustomerOnAction} style={styles.button}>
                    Save Customer
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
        backgroundColor: colors.primary,
        borderRadius: 8
    },
});
