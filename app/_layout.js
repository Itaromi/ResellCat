import { Stack, useSegments } from 'expo-router';
import { PanierProvider } from '../_context/panierContext';

export default function RootLayout() {
    const segments = useSegments();
    const isInProfile = segments.includes('(profile)');
    return (
        <PanierProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#fff' },
                    headerTitleStyle: { fontWeight: 'bold', color: 'tomato' },
                    headerTintColor: 'tomato',
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        title: 'Adopte un Chat 🐾',
                        headerShown: !isInProfile,
                    }}
                />

                <Stack.Screen
                    name="details"
                    options={({ navigation }) => ({
                        title: 'Détails du chat 🐈',
                        presentation: 'card',
                        headerBackTitle: 'Retour'
                    })}
                />

            <Stack.Screen
                name="(sandbox)"
                options={({ navigation }) => ({
                    title: 'Sandbox',
                    headerShown: !isInProfile,
                })}
            />
        </Stack>
        </PanierProvider>
    );
}