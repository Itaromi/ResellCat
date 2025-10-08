import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useMessageStore = create(
    persist(
        (set, get) => ({
            conversations: [],
            loading: false,
            error: null,

            fetchConversations: async () => {
                const existing = get().conversations;
                if (existing.length > 0) return;

                set({ loading: true });
                try {
                    const res = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=30");
                    const data = await res.json();

                    const grouped = Object.values(
                        data.reduce((acc, item) => {
                            if (!acc[item.postId]) {
                                acc[item.postId] = {
                                    postId: item.postId,
                                    messages: [],
                                    preview: "",
                                    email: "",
                                };
                            }
                            acc[item.postId].messages.push(item);
                            acc[item.postId].preview = item.body;
                            acc[item.postId].email = item.email;
                            return acc;
                        }, {})
                    );

                    set({ conversations: grouped, loading: false });
                } catch (err) {
                    set({ error: err.message, loading: false });
                }
            },

            addMessage: (postId, newMessage) => {
                const updated = get().conversations.map((conv) =>
                    conv.postId === postId
                        ? {
                            ...conv,
                            messages: [...conv.messages, newMessage],
                            preview: newMessage.body,
                        }
                        : conv
                );
                set({ conversations: updated });
            },
        }),
        {
            name: "message-storage",
            storage: {
                getItem: async (name) => {
                    try {
                        const value = await AsyncStorage.getItem(name);
                        return value ? JSON.parse(value) : null;
                    } catch {
                        return null; // évite les erreurs d’accès sous Expo Go
                    }
                },
                setItem: async (name, value) => {
                    try {
                        await AsyncStorage.setItem(name, JSON.stringify(value));
                    } catch {
                        // ignore le warning Expo Go
                    }
                },
                removeItem: async (name) => {
                    try {
                        await AsyncStorage.removeItem(name);
                    } catch {
                    }
                },
            },
            onRehydrateStorage: () => (state) => {
                console.log("Message store reloaded depuis le storage");
            },
        }
    )
);
export default {};
