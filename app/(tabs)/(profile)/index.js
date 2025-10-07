import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Profile() {
    return (
        <SafeAreaView style={styles.safe}>
            <LinearGradient colors={['#FFD5C2', '#FFF']} style={styles.header} />

            <View style={styles.container}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={{ uri: 'https://www.placekittens.com/200/300' }}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>johndoe@email.com</Text>
                <Text style={styles.bio}>Adopteur passionné 🐱 | “Adopte-les tous !”</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Adoptions</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Favoris</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Commentaires</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '../(sandbox)/playground' })}>
                    <Ionicons name="create-outline" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Modifier le profil</Text>

                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    avatarWrapper: {
        borderWidth: 4,
        borderColor: '#fff',
        borderRadius: 90,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginVertical: 4,
    },
    bio: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 20,
    },
    stat: { alignItems: 'center' },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: 'tomato' },
    statLabel: { fontSize: 12, color: 'gray' },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'tomato',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 30,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 6,
    },
});