import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { usePanier } from '../../../_context/panierContext';
import { Ionicons } from '@expo/vector-icons';

export default function Panier() {
    const { panier, changerDuree, supprimerDuPanier, total } = usePanier();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon panier 🧺</Text>

            {panier.length === 0 ? (
                <Text style={styles.empty}>Aucun chat ajouté pour le moment.</Text>
            ) : (
                <FlatList
                    data={panier}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                                <View style={styles.dureeRow}>
                                    <Text>Durée (jours): </Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={item.duree.toString()}
                                        onChangeText={(text) => changerDuree(item.id, parseInt(text) || 1)}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => supprimerDuPanier(item.id)}>
                                <Ionicons name="trash" size={24} color="tomato" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {panier.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>
                    <TouchableOpacity style={styles.validerButton}>
                        <Text style={styles.validerText}>Valider la location</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    empty: { textAlign: 'center', marginTop: 50, color: 'gray' },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    image: { width: 70, height: 70, borderRadius: 8 },
    info: { flex: 1, marginLeft: 10 },
    name: { fontWeight: 'bold', fontSize: 16 },
    price: { color: 'tomato', marginVertical: 2 },
    dureeRow: { flexDirection: 'row', alignItems: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 50,
        textAlign: 'center',
        borderRadius: 6,
        marginLeft: 5,
        paddingVertical: 2,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    validerButton: {
        backgroundColor: 'tomato',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    validerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});