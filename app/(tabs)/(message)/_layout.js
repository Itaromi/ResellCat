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
                name="index"
                options={{
                    title: "Message",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="message"
                options={{
                    title: "Message",
                    headerShown: false }}
            />
        </Stack>
    );
}