import { create } from "zustand"

type status = "PLANNED" | "ONGOING" | "DONE";

export interface Task {
    title: string;
    status: status;
}

interface Store {
    tasks: Task[];
}

export const useStore = create<Store>()((set) => ({
    tasks: [
        { title: "Task 1", status: "PLANNED" },
        { title: "Task 2", status: "ONGOING" },
        { title: "Task 3", status: "DONE" },
    ],
}))