import { FC, useMemo, useState } from "react";
import Task from "./Task";
import { status, useStore } from "../zustand/store";

interface ColumnProps {
  state: status;
}

const taskStatus: Array<status> = ["PLANNED", "ONGOING", "DONE"]

const Column: FC<ColumnProps> = ({ state }) => {
  const [text, setText] = useState<string>('')
  const [status, setStatus] = useState<status>('PLANNED')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // This is a custom hook that filters tasks based on their status and it is the react solution
  const tasks = useStore(store => store.tasks)

  const filteredTasks = useMemo(() => tasks.filter(task => task.status === state)
    , [tasks, state])

  const addTask = useStore(store => store.addTask)

  const handleChange = (value: string) => { setText(value) }

  const handleStatusChange = (value: status) => { setStatus(value) }

  const resetFields = () => {
    setText('')
    setStatus('PLANNED')
  }
  return (
    <div className="min-h-[20rem] w-[15rem] bg-gray-100 rounded-md p-4">
      <div className="flex justify-between mb-3">
        <p>{state}</p>
        <button className="px-4 py-2 bg-white rounded hover:bg-green-100 hover:shadow-md duration-150"
          onClick={() => setIsModalOpen(true)}>Add</button>
      </div>
      {filteredTasks.map((task, index) => <Task key={`${task.title}-${index}`} title={task.title} STATUS={task.status} />)}

      {/* Modal */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 duration-300 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white p-4 rounded-md">
          <div className=" flex flex-col mb-4">
            <label htmlFor="text" className="text-lg">Task:</label>
            <input className="border-2 rounded min-h-10 p-3" id="text" type="text" value={text} onChange={(e) => handleChange(e.target.value)} />
          </div>
          <div className=" flex flex-col mb-4">
            <label htmlFor="status" className="text-lg">Status:</label>
            <select className="border-2 rounded min-h-10 p-3" id="status" defaultValue="Please Select" value={status} onChange={(e) => handleStatusChange(e.target.value as status)}>
              {
                taskStatus.map((status, index) => <option key={`${status}-${index}`} value={status}>{status}</option>)
              }
            </select>
          </div>
          <div className="text-center">
            <button
              onClick={() => {
                addTask(text, status)
                setIsModalOpen(false)
                resetFields()
              }}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-green-100 hover:shadow-md duration-150">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Column