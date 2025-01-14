import { produce } from "immer";
import { create } from "zustand"
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export type Status = "PLANNED" | "ONGOING" | "DONE";

export interface Task {
    id: string;
    title: string;
    status: Status;
}

export interface Store {
    tasksInOnGoing: Task[];
    tasks: Task[];
    draggedTask: Task | null;
    addTask(id: string, title: string, status: Status): void;
    deleteTask(title: string): void;
    setDraggedTask(task: Task | null): void;
    moveTask(id: string, status: Status): void;
}

export const useStore = create<Store>()(subscribeWithSelector(persist(devtools((set) => ({
    tasks: [],
    addTask: (id, title, status) =>
        set(
            produce((state) => {
                state.tasks.push({ id, title, status })
            })
            // (state) => ({ tasks: [...state.tasks, { id, title, status }] })
            , false, "addTask"),
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
), { name: "task-app-zustand" })))

useStore.subscribe(
    (store) => store.tasks,
    (newTask, prevTask) => {
        if (newTask !== prevTask) {
            useStore.setState({ tasksInOnGoing: newTask.filter((task: Task) => task.status === "ONGOING") });
            console.log("Tasks changed", newTask);
        }
    }
);