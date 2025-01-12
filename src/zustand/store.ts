import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";

export type status = "PLANNED" | "ONGOING" | "DONE";

export interface Task {
    id: string;
    title: string;
    status: status;
}

interface Store {
    tasks: Task[];
    draggedTask: Task | null;
    addTask(id: string, title: string, status: status): void;
    deleteTask(title: string): void;
    setDraggedTask(task: Task | null): void;
    moveTask(id: string, status: status): void;
}

export const useStore = create<Store>()(persist(devtools((set) => ({
    tasks: [],
    addTask: (id, title, status) => set((state) => ({ tasks: [...state.tasks, { id, title, status }] }), false, "addTask"),
    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
    }), false, "deleteTask"),
    draggedTask: null,
    setDraggedTask: (task) => set({ draggedTask: task }, false, "setDraggedTask"),
    moveTask: (id, status) => set((state) => {
        const task = state.tasks.find(task => task.id === id);
        if (task) {
            task.status = status;
        }
        return { tasks: [...state.tasks] }
    }, false, "moveTask")

})
), { name: "task-app-zustand" }))