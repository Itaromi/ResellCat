import { Stack } from "expo-router";

export default function SandboxLayout() {
    return (
        <Stack
            screenOptions={{
                headerTintColor: "tomato",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#fff" },
            }}
        >
            <Stack.Screen
                name="playground"
                options={{
                    title: "Sandbox",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="exo-state"
                options={{ title: "Exercice 1 - useState" }}
            />
            <Stack.Screen
                name="exo-effect"
                options={{ title: "Exercice 2 - useEffect" }}
            />
            <Stack.Screen
                name="exo-context"
                options={{ title: "Exercice 3 - useContext" }}
            />
            <Stack.Screen
                name="exo-zustand"
                options={{ title: "Exercice 4 - Zustand" }}
            />
            <Stack.Screen
                name="exo-formulaire"
                options={{ title: "Exercice 5 - Formulaire" }}
            />
        </Stack>
    );
}