import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";

const DATA_URL =
    "https://gist.githubusercontent.com/Fabsforce/a76097aa83d4f5d1b3c5c9868e2d51d3/raw/25d6501b6a6969268b47b489b32629f2d0eb223d/logements.json";

export default function FetchLogements() {
    const [logements, setLogements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const getData = useCallback(async () => {
        try {
            if (!refreshing) setLoading(true);
            const response = await fetch(DATA_URL);
            if (!response.ok) throw new Error("Erreur de chargement");
            const data = await response.json();
            setLogements(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [refreshing]);

    useEffect(() => {
        getData();
    }, [getData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
    }, [getData]);

    if (loading && !refreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="tomato" />
                <Text style={styles.loadingText}>Chargement des logements...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Erreur : {error}</Text>
                <TouchableOpacity onPress={getData} style={styles.retryButton}>
                    <Text style={styles.retryText}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={logements}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["tomato"]} />
            }
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                    <Image source={{ uri: item.cover || item.image }} style={styles.image} />
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.type}>🏷️ {item.type}</Text>
                        <Text style={styles.location}>📍 {item.city}</Text>
                        <Text style={styles.price}>💶 {item.price} € / nuit</Text>

                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐ {item.rating?.toFixed(1)} / 5</Text>
                            <Text style={styles.reviews}>({item.reviews} avis)</Text>
                        </View>

                        <Text numberOfLines={2} style={styles.description}>
                            {item.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    loadingText: {
        marginTop: 10,
        color: "gray",
    },
    errorText: {
        color: "tomato",
        fontWeight: "bold",
        marginBottom: 10,
    },
    retryButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "tomato",
        borderRadius: 8,
    },
    retryText: {
        color: "white",
        fontWeight: "600",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 200,
    },
    cardContent: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "tomato",
        marginBottom: 4,
    },
    type: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
    },
    location: {
        fontSize: 15,
        color: "#333",
    },
    price: {
        fontSize: 15,
        fontWeight: "600",
        color: "tomato",
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    rating: {
        fontSize: 14,
        color: "#ffb400",
        fontWeight: "600",
    },
    reviews: {
        fontSize: 13,
        color: "#777",
        marginLeft: 4,
    },
    description: {
        fontSize: 13,
        color: "#555",
        lineHeight: 18,
    },
});