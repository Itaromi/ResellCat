import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useTaskStore } from "../store/useTaskStore";

export default function ExoZustand() {
    const {
        tasks,
        addTask,
        toggleTask,
        removeTask,
        clearTasks,
        theme,
        toggleTheme,
    } = useTaskStore();
    const [input, setInput] = useState("");

    const colors =
        theme === "light" ? { bg: "#fff", text: "#000" } : { bg: "#000", text: "#fff" };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
                <Text style={[styles.title, { color: colors.text }]}>📝 Mes Tâches</Text>

                <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Nouvelle tâche..."
                    placeholderTextColor="#888"
                />

                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                        if (input.trim()) {
                            addTask(input);
                            setInput("");
                        }
                    }}
                >
                    <Text style={{ color: "#fff" }}>Ajouter</Text>
                </TouchableOpacity>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.task}
                            onPress={() => toggleTask(item.id)}
                            onLongPress={() => removeTask(item.id)}
                        >
                            <Text
                                style={{
                                    textDecorationLine: item.done ? "line-through" : "none",
                                    color: colors.text,
                                }}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.footer}>
                    <TouchableOpacity onPress={clearTasks}>
                        <Text style={{ color: "tomato" }}>Tout effacer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleTheme}>
                        <Text style={{ color: "tomato" }}>
                            Thème : {theme === "light" ? "☀️" : "🌙"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 10,
    },
    addBtn: {
        backgroundColor: "tomato",
        padding: 10,
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    task: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});