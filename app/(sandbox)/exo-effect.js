import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { Audio } from "expo-av";
import catGif from "../../assets/images/soviet-cat-sovicat.gif";

const meows = [
    require("../../assets/meow/cat-meow-7-fx-306186.mp3"),
    require("../../assets/meow/cat-meow-8-fx-306184.mp3"),
    require("../../assets/meow/cat-meow-321642.mp3"),
    require("../../assets/meow/cat-meow-401729.mp3"),
];

export default function ChatPawCounter() {
    const [count, setCount] = useState(0);
    const [position, setPosition] = useState({ top: 300, left: 150 });
    const { width, height } = Dimensions.get("window");

    const playRandomMeow = async () => {
        try {
            const randomIndex = Math.floor(Math.random() * meows.length);
            const sound = new Audio.Sound();
            await sound.loadAsync(meows[randomIndex]);
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.warn("Erreur lecture son :", error);
        }
    };

    const handlePress = () => {
        setCount((prev) => prev + 1);
        playRandomMeow();

        const randomTop = Math.random() * (height - 200);
        const randomLeft = Math.random() * (width - 120);
        setPosition({ top: randomTop, left: randomLeft });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>🐾 Nombre de clics : {count}</Text>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handlePress}
                style={[styles.pawContainer, { top: position.top, left: position.left }]}
            >
                <Image source={catGif} style={styles.paw} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 60,
        color: "tomato",
    },
    pawContainer: {
        position: "absolute",
    },
    paw: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "tomato",
    },
});