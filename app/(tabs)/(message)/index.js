import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Image } from "react-native";
import { useRouter } from "expo-router";
import { useMessageStore } from "../../../store/messageStore";

export default function ConversationsList() {
    const { conversations, loading, error, fetchConversations } = useMessageStore();
    const router = useRouter();

    useEffect(() => {
        fetchConversations();
    }, []);

    const extractName = (email) => {
        if (!email) return "Utilisateur";
        const match = email.match(/^([^.@]+)/);
        return match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : "Utilisateur";
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="tomato" />
                <Text style={styles.loadingText}>Chargement des conversations...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Erreur : {error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={conversations}
            keyExtractor={(item) => item.postId.toString()}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchConversations} colors={["tomato"]} />}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
                const name = extractName(item.email);
                const date = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "2-digit" });

                return (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() =>
                            router.push({
                                pathname: "/(tabs)/(message)/message",
                                params: { postId: item.postId },
                            })
                        }
                    >
                        <Image source={{ uri: `https://www.placekittens.com/100/100?image=${item.postId}` }} style={styles.avatar} />
                        <View style={styles.textContainer}>
                            <View style={styles.topRow}>
                                <Text style={styles.name}>{name}</Text>
                                <Text style={styles.date}>{date}</Text>
                            </View>
                            <Text style={styles.preview} numberOfLines={1}>
                                {item.preview}
                            </Text>
                            <Text style={styles.subText}>Conversation n°{item.postId}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    list: { backgroundColor: "#fff", paddingVertical: 10 },
    row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
    avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 14, borderWidth: 1.5, borderColor: "#f1f1f1" },
    textContainer: { flex: 1, justifyContent: "center" },
    topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
    name: { fontSize: 16, fontWeight: "600", color: "#222" },
    date: { fontSize: 12, color: "#888" },
    preview: { fontSize: 14, color: "#555", marginBottom: 3 },
    subText: { fontSize: 12, color: "tomato" },
    loadingText: { color: "gray", marginTop: 10 },
    errorText: { color: "tomato", fontWeight: "bold" },
});