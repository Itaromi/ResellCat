import React, { createContext, useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import catGif from "../../assets/images/soviet-cat-sovicat.gif";

const GameContext = createContext();
const useGame = () => useContext(GameContext);

const GameProvider = ({ children }) => {
    const [food, setFood] = useState(0);
    const [mood, setMood] = useState("😿");

    const feedCat = () => {
        const newFood = food + 1;
        setFood(newFood);
        if (newFood < 3) setMood("😺");
        else if (newFood < 6) setMood("😸");
        else setMood("😻");
    };

    const resetGame = () => {
        setFood(0);
        setMood("😿");
    };

    return (
        <GameContext.Provider value={{ food, mood, feedCat, resetGame }}>
            {children}
        </GameContext.Provider>
    );
};

function FeedTheCatGame() {
    const { food, mood, feedCat, resetGame } = useGame();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🍗 Feed the Cat</Text>
            <Text style={styles.text}>Humeur : {mood}</Text>
            <TouchableOpacity onPress={feedCat}>
                <Image source={catGif} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>Croquettes données : {food}</Text>
            <TouchableOpacity style={styles.button} onPress={resetGame}>
                <Text style={{ color: "#fff" }}>Réinitialiser</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function ExoContext() {
    return (
        <GameProvider>
            <FeedTheCatGame />
        </GameProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 26, fontWeight: "bold", color: "tomato", marginBottom: 10 },
    text: { fontSize: 20, marginVertical: 5 },
    image: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "tomato" },
    button: { marginTop: 20, backgroundColor: "tomato", padding: 10, borderRadius: 8 },
});