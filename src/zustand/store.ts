import { create } from "zustand"

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
    })),
    draggedTask: null,
    setDraggedTask: (task) => set({ draggedTask: task }),
    moveTask: (id, status) => set((state) => {
        const task = state.tasks.find(task => task.id === id);
        if (task) {
            task.status = status;
        }
        return { tasks: [...state.tasks] }
    })

})
)