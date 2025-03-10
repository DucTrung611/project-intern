"use client";
import { useState } from "react";

export default function TodoApp() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
    const [input, setInput] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editInput, setEditInput] = useState<string>("");

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, input]);
            setCompletedTasks([...completedTasks, false]); // Thêm trạng thái chưa hoàn thành
            setInput("");
        }
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    };

    const startEdit = (index: number) => {
        setEditIndex(index);
        setEditInput(tasks[index]);
    };

    const saveEdit = (index: number) => {
        if (editInput.trim()) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = editInput;
            setTasks(updatedTasks);
            setEditIndex(null);
        }
    };

    const toggleComplete = (index: number) => {
        const updatedCompletedTasks = [...completedTasks];
        updatedCompletedTasks[index] = !updatedCompletedTasks[index]; // Đảo trạng thái hoàn thành
        setCompletedTasks(updatedCompletedTasks);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <div className="w-full max-w-2xl rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">To-Do List</h1>
                <div className="flex mt-4 gap-[10px]">
                    <input
                        type="text"
                        className="flex-1 border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Thêm công việc..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Thêm
                    </button>
                </div>
                <ul className="mt-4 space-y-2">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center bg-gray-200 p-2 rounded-md transition ${completedTasks[index] ? "opacity-50 line-through" : ""
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={completedTasks[index]}
                                    onChange={() => toggleComplete(index)}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        className="flex-1 border p-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                                        autoFocus
                                    />
                                ) : (
                                    <span>{task}</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {editIndex === index ? (
                                    <button
                                        onClick={() => saveEdit(index)}
                                        className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                                    >
                                        Lưu
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => startEdit(index)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition"
                                    >
                                        Sửa
                                    </button>
                                )}
                                <button
                                    onClick={() => removeTask(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
