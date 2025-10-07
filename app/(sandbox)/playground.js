import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Playground() {
    const exercises = [
        { title: "exo 1 - useState", route: "/(sandbox)/exo-state" },
        { title: "exo 2 - useEffect", route: "/(sandbox)/exo-effect" },
        { title: "exo 3 - useContext", route: "/(sandbox)/exo-context" },
        { title: "exo 4 - Zustand", route: "/(sandbox)/exo-zustand" },
        { title: "exo 5 - Formulaire", route: "/(sandbox)/exo-formulaire" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sandbox - Espace Youn</Text>

            {exercises.map((exo, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => router.push(exo.route)}
                >
                    <Text style={styles.buttonText}>{exo.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "tomato",
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#f8f8f8",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginVertical: 8,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonText: {
        color: "tomato",
        fontSize: 18,
        fontWeight: "500",
    },
});