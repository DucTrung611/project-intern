"use client";
import { useEffect, useState } from "react";
import TodoItem from "./todo.item";

export interface ITodoItem {
    label: string;
    status: 'todo' | 'pending' | 'done' | 'inProgress';

}

export default function TodoApp() {
    const [page, setPage] = useState<number>(1)
    const [tasks, setTasks] = useState<ITodoItem[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const totalPages = 10;

    const onAddTask = () => {
        setTasks((prev) => [...prev, {
            label: inputValue,
            status: 'todo'
        }])
    }
    const onDelete = (index: number) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    }
    const onEdit = (index: number, updatedTask: ITodoItem) => {
        setTasks((prev) => prev.map((task, i) => (i === index ? updatedTask : task)));
    };


    return (
        <div className="flex flex-col items-center p-5">
            <div className="w-full max-w-2xl rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">To-Do List</h1>
                <div className="flex mt-4 gap-2">
                    <input
                        type="text"
                        className="flex-1 border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Thêm công việc..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onAddTask()}
                    />
                    <button
                        onClick={onAddTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Thêm
                    </button>
                </div>

                {/* Danh sách task */}

                <ul className="mt-4 space-y-2">
                    {tasks.map((task, index) => (
                        <TodoItem
                            key={index}
                            index={index}
                            task={task}
                            onDelete={() => onDelete(index)}
                            onEdit={onEdit}
                        />
                    ))}
                </ul>
                {/* Phân trang */}
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        ← Trước
                    </button>

                    <span>Trang {page} / {totalPages}</span>

                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded-md ${page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Sau →
                    </button>
                </div>
            </div>
        </div>
    );
}
