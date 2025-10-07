import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import cats from '../../cat.json';
import { usePanier } from '../../../_context/panierContext';
import { Snackbar } from 'react-native-paper';

export default function Home() {
  const router = useRouter();
  const { ajouterAuPanier } = usePanier();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getCategory = (ageString) => {
    const match = ageString.match(/(\d+)\s*(an|ans|mois)/i);
    if (!match) return 'Chats adultes';
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    const ageInYears = unit === 'mois' ? value / 12 : value;
    if (ageInYears < 1) return 'Chatons';
    if (ageInYears <= 4) return 'Chats adultes';
    return 'Chats seniors';
  };

  const categorizedCats = cats.reduce((acc, cat) => {
    const category = getCategory(cat.age);
    const found = acc.find((c) => c.title === category);
    if (found) found.data.push(cat);
    else acc.push({ title: category, data: [cat] });
    return acc;
  }, []);

  const orderedCategories = ['Chatons', 'Chats adultes', 'Chats seniors'];
  const sortedCats = orderedCategories
      .map((cat) => categorizedCats.find((c) => c.title === cat))
      .filter(Boolean);

  const handleAddToPanier = (chat) => {
    ajouterAuPanier(chat);
    setSnackbarMessage(`${chat.name} ajouté au panier 🧺`);
    setSnackbarVisible(true);
  };

  return (
      <>
        <ScrollView style={styles.container}>
          {sortedCats.map((category) => (
              <View key={category.title} style={styles.section}>
                <View style={styles.headerRow}>
                  <Text style={styles.sectionTitle}>{category.title}</Text>

                  {category.title === 'Chatons' && (
                      <TouchableOpacity
                          onPress={() => router.push('/(tabs)/(explorer)/fetch')}
                      >
                        <Ionicons name="home" size={26} color="tomato" />
                      </TouchableOpacity>
                  )}
                </View>

                <FlatList
                    horizontal
                    data={category.data}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                          <TouchableOpacity
                              onPress={() =>
                                  router.push({ pathname: '/details', params: item })
                              }
                          >
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.textContainer}>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.age}>{item.age}</Text>
                              <Text style={styles.price}>{item.price}</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.addButton}
                              onPress={() => handleAddToPanier(item)}
                          >
                            <Ionicons name="add-circle" size={30} color="tomato" />
                          </TouchableOpacity>
                        </View>
                    )}
                />
              </View>
          ))}
        </ScrollView>

        <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={2000}
            style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', paddingTop: 10 },
  section: { marginBottom: 20 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  sectionTitle: { fontSize: 22, fontWeight: 'bold' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    width: 160,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    paddingBottom: 10,
    position: 'relative',
  },
  image: { width: 160, height: 160, resizeMode: 'cover' },
  textContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  name: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  age: { fontSize: 14, color: 'gray', textAlign: 'center' },
  price: { fontSize: 14, color: 'tomato', marginBottom: 6, textAlign: 'center' },
  addButton: { position: 'absolute', bottom: 5, right: 5 },
  snackbar: { backgroundColor: 'tomato', marginBottom: 20, borderRadius: 10 },
});