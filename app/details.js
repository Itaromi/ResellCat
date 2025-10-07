import React, { useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 350;

export default function Details() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const { name, image, age, desc, price } = useLocalSearchParams();

    const headerTranslate = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT / 2, 0, -HEADER_HEIGHT / 2],
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-100, 0, 150],
        outputRange: [1.5, 1, 0.9],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{age}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Don suggéré :</Text>
                        <Text style={styles.priceValue}>
                            {price === 'Don libre' ? 'Libre — votre choix ❤️' : price}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>À propos de {name}</Text>
                        <Text style={styles.desc}>{desc}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Profil</Text>
                        <Text style={styles.infoText}>• Race : Européen tigré</Text>
                        <Text style={styles.infoText}>• Caractère : affectueux, calme et joueur</Text>
                        <Text style={styles.infoText}>• Stérilisé : Oui</Text>
                        <Text style={styles.infoText}>• Vacciné : Oui</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Adoption</Text>
                        <Text style={styles.infoText}>
                            L’adoption est ouverte à tous les foyers bienveillants. Une participation libre permet
                            de soutenir les soins, la nourriture et la stérilisation d’autres chats.
                        </Text>
                    </View>

                    <View style={[styles.section, { marginBottom: 120 }]}>
                        <Text style={styles.sectionTitle}>Informations pratiques</Text>
                        <Text style={styles.infoText}>
                            • Dossier d’adoption fourni (carnet de santé, certificat vétérinaire, puce).
                        </Text>
                        <Text style={styles.infoText}>
                            • Une rencontre préalable peut être organisée avant adoption.
                        </Text>
                    </View>
                </View>
            </Animated.ScrollView>

            <Animated.View
                style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}
            >
                <Animated.Image
                    source={{ uri: image }}
                    style={[styles.image, { transform: [{ scale: imageScale }] }]}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                    style={styles.overlay}
                />
            </Animated.View>

            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <Text style={styles.footerPrice}>
                        {price === 'Don libre' ? 'Don libre ❤️' : price}
                    </Text>
                    <Text style={styles.footerSubtitle}>Aidez à offrir un foyer à {name}</Text>
                </View>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Adopter maintenant</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
            </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        overflow: 'hidden',
        zIndex: 1,
    },
    image: { width, height: HEADER_HEIGHT + 50, resizeMode: 'cover' },
    overlay: { position: 'absolute', width: '100%', height: '100%' },
    content: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 25,
    },
    title: { fontSize: 30, fontWeight: 'bold', color: '#222', marginBottom: 4 },
    subtitle: { fontSize: 17, color: 'gray', marginBottom: 20 },
    priceContainer: {
        backgroundColor: '#FFF6F4',
        borderRadius: 10,
        padding: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#FFD5C2',
    },
    priceLabel: { color: '#666', fontSize: 14, marginBottom: 4 },
    priceValue: { color: 'tomato', fontWeight: 'bold', fontSize: 18 },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    desc: { fontSize: 15, color: '#555', lineHeight: 22 },
    infoText: { fontSize: 14, color: '#666', lineHeight: 22 },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    footerLeft: { flex: 1 },
    footerPrice: { fontSize: 20, fontWeight: 'bold', color: 'tomato' },
    footerSubtitle: { fontSize: 12, color: 'gray', marginTop: 2 },
    footerButton: {
        backgroundColor: 'tomato',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    footerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});