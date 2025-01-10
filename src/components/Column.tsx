import { FC } from "react";

interface ColumnProps {
  state: string;
}

const Column: FC<ColumnProps> = ({ state }) => {
  return (
    <div className="">{state}</div>
  )
}

export default Column