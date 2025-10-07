import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileLayout() {
    return (
        <Drawer
            screenOptions={{
                headerTintColor: 'tomato',
                headerTitleAlign: 'center',
                drawerActiveTintColor: 'tomato',
                drawerLabelStyle: { fontSize: 15 },
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                    title: 'Mon Profil',
                    drawerLabel: 'Profil',
                    headerShown: true,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="params"
                options={{
                    title: 'Paramètres',
                    drawerLabel: 'Paramètres',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                }}
            />
        </Drawer>
    );
}