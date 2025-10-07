import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTaskStore = create(
    persist(
        (set, get) => ({
            tasks: [],
            theme: "light",

            addTask: (title) => {
                const newTask = {
                    id: Date.now().toString(),
                    title,
                    done: false,
                };
                set({ tasks: [...get().tasks, newTask] });
            },

            toggleTask: (id) => {
                set({
                    tasks: get().tasks.map((t) =>
                        t.id === id ? { ...t, done: !t.done } : t
                    ),
                });
            },

            removeTask: (id) => {
                set({ tasks: get().tasks.filter((t) => t.id !== id) });
            },

            clearTasks: () => set({ tasks: [] }),

            toggleTheme: () => {
                const current = get().theme;
                set({ theme: current === "light" ? "dark" : "light" });
            },
        }),
        {
            name: "task-storage", // clé AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);