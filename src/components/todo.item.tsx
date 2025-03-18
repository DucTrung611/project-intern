'use client'
import clsx from "clsx";
import { useState } from "react"
import { ITodoItem } from "./todo.app"
type StatusType = "todo" | "pending" | "done" | "inProgress";
interface IProps {
    task: ITodoItem;
    index: number;
    onDelete: () => void;
    onEdit: (index: number, item: ITodoItem) => void;
}

const TodoItem = ({ task, index, onDelete, onEdit }: IProps) => {
    const [valueInputUpdate, setValueInputUpdate] = useState(task.label);
    const [statusInputUpdate, setStatusInputUpdate] = useState<StatusType>(task.status);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onSave = () => {
        onEdit(index, {
            label: valueInputUpdate,
            status: statusInputUpdate,
        });
        setIsEdit(false);
    };

    return (
        <li className="flex justify-between items-center bg-gray-200 p-2 rounded-md transition">
            <div className="flex items-center gap-2">
                {isEdit ? (
                    <>
                        <select
                            value={statusInputUpdate}
                            onChange={(e) => setStatusInputUpdate(e.target.value as StatusType)}
                            className={clsx(
                                "border p-1 rounded-md text-white font-semibold",
                                {
                                    "bg-blue-500": statusInputUpdate === "todo",
                                    "bg-yellow-500": statusInputUpdate === "pending",
                                    "bg-green-500": statusInputUpdate === "done",
                                    "bg-purple-500": statusInputUpdate === "inProgress",
                                }
                            )}
                        >
                            <option value="todo" className="bg-white text-black">Todo</option>
                            <option value="pending" className="bg-white text-black">Pending</option>
                            <option value="done" className="bg-white text-black">Done</option>
                            <option value="inProgress" className="bg-white text-black">In Progress</option>
                        </select>

                        <input
                            type="text"
                            className="border p-1 rounded-md"
                            autoFocus
                            value={valueInputUpdate}
                            onChange={(e) => setValueInputUpdate(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSave()}
                        />
                    </>
                ) : (
                    <div>
                        <span
                            className={clsx(
                                "px-2 py-1 rounded-md text-white font-semibold",
                                {
                                    "bg-blue-500": task.status === "todo",
                                    "bg-yellow-500": task.status === "pending",
                                    "bg-green-500": task.status === "done",
                                    "bg-purple-500": task.status === "inProgress",
                                }
                            )}
                        >
                            {task.status}
                        </span> - <span>{task.label}</span>
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                {isEdit ? (
                    <button
                        className="bg-green-500 text-white px-2 py-1 rounded-md"
                        onClick={onSave}
                    >
                        Lưu
                    </button>
                ) : null}

                <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                    onClick={() => setIsEdit(!isEdit)}
                >
                    {isEdit ? 'Bỏ' : 'Sửa'}
                </button>

                <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={onDelete}
                >
                    Xóa
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
