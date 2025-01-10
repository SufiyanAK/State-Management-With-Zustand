import { FC } from "react";
import Task from "./Task";

interface ColumnProps {
  state: string;
}

const Column: FC<ColumnProps> = ({ state }) => {
  return (
    <div className="min-h-[20rem] w-[15rem] bg-gray-100 rounded-md p-4">
      <p>{state}</p>
      <Task title="Zu with Stand" />
    </div>
  )
}

export default Column