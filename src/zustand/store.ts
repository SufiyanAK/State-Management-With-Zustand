import { create } from "zustand"

export type status = "PLANNED" | "ONGOING" | "DONE";

export interface Task {
    id: string;
    title: string;
    status: status;
}

interface Store {
    tasks: Task[];
    addTask(id: string, title: string, status: status): void;
    deleteTask(title: string): void;
}

export const useStore = create<Store>()((set) =>
({
    tasks: [
        { id: '1', title: "Task 1", status: "PLANNED" },
        { id: '2', title: "Task 2", status: "ONGOING" },
        { id: '3', title: "Task 3", status: "DONE" },
    ],
    addTask: (id, title, status) => set((state) => ({ tasks: [...state.tasks, { id, title, status }] })),
    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
    }))
})
)