import classNames from "classnames"

const STATUS: string = "DONE"

const Task = ({ title }: { title: string }) => {
    return (
        <div className="bg-white rounded min-h-20 px-4 py-2 flex flex-col justify-between">
            <div>{title}</div>
            <div className="flex justify-between">
                <div></div>
                <div className={`text-sm p-2 rounded ${classNames(STATUS)}`}>{STATUS}</div>
            </div>
        </div>
    )
}

export default Task