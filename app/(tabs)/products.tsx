import {StyleSheet, Text, View} from "react-native";

export default function Products(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Products</Text>
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