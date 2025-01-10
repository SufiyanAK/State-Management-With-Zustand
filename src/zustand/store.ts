import { create } from "zustand"

export type status = "PLANNED" | "ONGOING" | "DONE";

export interface Task {
    title: string;
    status: status;
}

interface Store {
    tasks: Task[];
    addTask(title: string, status: status): void;
}

export const useStore = create<Store>()((set) => ({
    tasks: [
        { title: "Task 1", status: "PLANNED" },
        { title: "Task 2", status: "ONGOING" },
        { title: "Task 3", status: "DONE" },
    ],
    addTask: (title, status) => set((state) => ({ tasks: [...state.tasks, { title, status }] }))
}))