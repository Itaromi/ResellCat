import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMessageStore } from "../../../store/messageStore";

export default function Conversation() {
    const { postId } = useLocalSearchParams();
    const router = useRouter();
    const { conversations, addMessage, loading } = useMessageStore();
    const [newMessage, setNewMessage] = useState("");

    const conversation = conversations.find((c) => c.postId === parseInt(postId));
    const conversationBlocked = parseInt(postId) % 2 !== 0;

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const message = {
            id: Date.now(),
            body: newMessage,
            email: "you@resellcat.com",
        };
        addMessage(parseInt(postId), message);
        setNewMessage("");
    };

    if (loading || !conversation) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="tomato" />
                <Text style={{ color: "#555", marginTop: 8 }}>Chargement de la conversation...</Text>
            </View>
        );
    }

    const senderName = (() => {
        const email = conversation?.email || "";
        const match = email.match(/^([^.@]+)/);
        return match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : "Utilisateur";
    })();

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    style={styles.arrow}
                    onPress={() => router.push("/(tabs)/(message)")}
                />
                <Image
                    source={{ uri: "https://www.placekittens.com/100/100" }}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.name}>{senderName}</Text>
                    <Text style={styles.subText}>
                        {conversationBlocked ? "Conversation close" : "En ligne récemment"}
                    </Text>
                </View>
            </View>

            {/* LISTE DE MESSAGES */}
            <FlatList
                data={conversation.messages}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.messagesList}
                renderItem={({ item, index }) => {
                    const isUser = (index % 2 === 0) || item.email === "you@resellcat.com";
                    return (
                        <View
                            style={[
                                styles.messageContainer,
                                isUser ? styles.userContainer : styles.otherContainer,
                            ]}
                        >
                            {!isUser && (
                                <Image
                                    source={{ uri: "https://placekitten.com/80/80" }}
                                    style={styles.avatarSmall}
                                />
                            )}
                            <View
                                style={[
                                    styles.bubble,
                                    isUser ? styles.userBubble : styles.otherBubble,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.body,
                                        isUser ? styles.userText : styles.otherText,
                                    ]}
                                >
                                    {item.body}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            {/* INPUT / CONVERSATION CLOSE */}
            {conversationBlocked ? (
                <Text style={styles.footerText}>
                    🕓 Cette conversation est close.{" "}
                    <Text style={{ color: "tomato" }}>En savoir plus</Text>
                </Text>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Écrire un message..."
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Ionicons name="send" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    arrow: { fontSize: 30, marginRight: 10, color: "tomato" },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    name: { fontSize: 18, fontWeight: "bold", color: "tomato" },
    subText: { fontSize: 13, color: "gray" },

    messagesList: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },

    messageContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    otherContainer: { justifyContent: "flex-start" },
    userContainer: { justifyContent: "flex-end", alignSelf: "flex-end" },

    bubble: {
        maxWidth: "75%",
        borderRadius: 20,
        padding: 10,
    },
    otherBubble: {
        backgroundColor: "#f1f1f1",
        borderTopLeftRadius: 0,
        marginLeft: 5,
    },
    userBubble: {
        backgroundColor: "tomato",
        borderTopRightRadius: 0,
        marginLeft: "auto",
    },
    body: {
        fontSize: 14,
        lineHeight: 20,
    },
    otherText: { color: "#000" },
    userText: { color: "#fff" },
    avatarSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 6,
        marginTop: "auto",
    },

    footerText: {
        textAlign: "center",
        paddingVertical: 10,
        fontSize: 13,
        color: "#888",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 14,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: "tomato",
        borderRadius: 20,
        padding: 10,
    },

    center: { flex: 1, justifyContent: "center", alignItems: "center" },
});