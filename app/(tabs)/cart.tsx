import {View, StyleSheet, Text} from "react-native";

export default function Cart() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cart</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 18,
    },
});