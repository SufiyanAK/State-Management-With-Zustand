import classNames from "classnames"
import { useStore } from "../zustand/store"

// const STATUS: string = "DONE"

const Task = ({ id, title, STATUS }: { id: string, title: string, STATUS: string }) => {

    const { deleteTask } = useStore(store => store)
    return (
        <div className="bg-white rounded min-h-20 px-4 py-2 flex flex-col justify-between">
            <div>{title}</div>
            <div className="flex justify-between">
                <div>
                    <button onClick={() => deleteTask(id)} className="p-2 rounded shadow-md hover:bg-red-100 duration-150">
                        <img src="./images/Delete.svg" alt="icon" />
                    </button>
                </div>
                <div className={`text-sm p-2 rounded ${classNames(STATUS)}`}>{STATUS}</div>
            </div>
        </div>
    )
}

export default Task