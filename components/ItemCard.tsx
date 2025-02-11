import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import ItemModel from "@/model/ItemModel";
import colors from "@/constants/colors";

type Props = {
    item: ItemModel;
};

export default function ItemCard({ item }: Props) {
    const router = useRouter();

    function handlePress() {
        router.push({ pathname: "/screens/manage-product", params: { id: item.id } });
    }

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.cardWrapper}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: item.image || "https://via.placeholder.com/150" }} style={styles.image} />
                <Card.Content>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>Rs.{item.price.toFixed(2)}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        flex: 1,
        margin: 8,
        maxWidth: "48%",
    },
    card: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: colors.cardColor,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 6,
    },
    image: {
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
        marginVertical: 5,
    },
    price: {
        color: "#D32F2F",
        fontWeight: "bold",
        fontSize: 16,
        alignSelf: "flex-end",
        marginTop: 5,
    },
});
