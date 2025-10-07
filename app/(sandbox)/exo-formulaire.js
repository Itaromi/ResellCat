import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

import catGif from "../../assets/images/soviet-cat-sovicat.gif";

export default function ChatPawCounter() {
    const [count, setCount] = useState(0);
    const [position, setPosition] = useState({ top: 300, left: 150 });

    const { width, height } = Dimensions.get("window");

    useEffect(() => {
        console.log("Compteur mis à jour :", count);
    }, [count]);

    const handlePress = () => {
        setCount(count + 1);

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