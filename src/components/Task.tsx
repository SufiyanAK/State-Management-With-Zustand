import classNames from "classnames"
import { type Task, useStore } from "../zustand/store"
import { FC } from "react"

// const STATUS: string = "DONE"
export interface TaskProps {
    task: Task
}
const Task: FC<TaskProps> = ({ task }) => {
    const { deleteTask, setDraggedTask } = useStore(store => store)

    return (
        <div
            className="cursor-move bg-white rounded min-h-20 px-4 py-2 flex flex-col justify-between"
            draggable
            onDragStart={() => setDraggedTask(task)}
        >
            <div>{task.title}</div>
            <div className="flex justify-between">
                <div>
                    <button onClick={() => deleteTask(task.id)} className="p-2 rounded shadow-md hover:bg-red-100 duration-150">
                        <img src="./images/Delete.svg" alt="icon" />
                    </button>
                </div>
                <div className={`text-sm p-2 rounded ${classNames(task.status)}`}>{task.status}</div>
            </div>
        </div>
    )
}

export default Task