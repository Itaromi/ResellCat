import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="(explorer)/index"
                options={{
                    title: 'Explorer',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="paw" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(panier)/panier"
                options={{
                    title: 'Panier',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="basket" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profil',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(explorer)/fetch"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}