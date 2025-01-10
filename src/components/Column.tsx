import { FC, useMemo } from "react";
import Task from "./Task";
import { useStore } from "../zustand/store";

interface ColumnProps {
  state: string;
}

const Column: FC<ColumnProps> = ({ state }) => {
  // This is a custom hook that filters tasks based on their status and it is the react solution
  const tasks = useStore(store => store.tasks)

  const filteredTasks = useMemo(() => tasks.filter(task => task.status === state)
    , [tasks, state])

  console.log('filtered Tasks', filteredTasks)
  return (
    <div className="min-h-[20rem] w-[15rem] bg-gray-100 rounded-md p-4">
      <div className="flex justify-between mb-3">
        <p>{state}</p>
        <button className="px-4 py-2 bg-white rounded hover:bg-green-100 hover:shadow-md duration-150">Add</button>
      </div>
      {filteredTasks.map(task => <Task key={task.title} title={task.title} STATUS={task.status} />)}
    </div>
  )
}

export default Column