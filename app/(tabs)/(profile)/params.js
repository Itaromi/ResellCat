import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Params() {
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>

            <View style={styles.setting}>
                <Ionicons name="moon-outline" size={22} color="tomato" />
                <Text style={styles.settingLabel}>Mode sombre</Text>
                <Switch
                    value={darkMode}
                    onValueChange={() => setDarkMode(!darkMode)}
                    thumbColor={darkMode ? 'tomato' : '#ccc'}
                />
            </View>

            <View style={styles.setting}>
                <Ionicons name="notifications-outline" size={22} color="tomato" />
                <Text style={styles.settingLabel}>Notifications</Text>
                <Switch
                    value={true}
                    onValueChange={() => {}}
                    thumbColor="tomato"
                />
            </View>

            <View style={styles.setting}>
                <Ionicons name="lock-closed-outline" size={22} color="tomato" />
                <Text style={styles.settingLabel}>Confidentialité</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'tomato',
        marginBottom: 30,
        textAlign: 'center',
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingLabel: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
});