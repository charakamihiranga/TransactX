import {View, Text, StyleSheet} from "react-native";

export default function Customer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Customer</Text>
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
