"use client";
import { useEffect, useState } from "react";
import { data_fake } from "./data";

export default function TodoApp() {



    const [tasks, setTasks] = useState<string[]>(data_fake);
    const [completedTasks, setCompletedTasks] = useState<boolean[]>(new Array(data_fake.length).fill(false));
    const [input, setInput] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editInput, setEditInput] = useState<string>("");

    useEffect(() => {
        setCompletedTasks(new Array(tasks.length).fill(false));
    }, [tasks]); // Cập nhật completedTasks khi tasks thay đổi


    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3;

    // Tính toán danh sách hiển thị
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const currentCompletedTasks = completedTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, input]);
            setCompletedTasks([...completedTasks, false]);
            setInput("");
        }
    };

    const removeTask = (index: number) => {
        const globalIndex = indexOfFirstTask + index;
        setTasks(tasks.filter((_, i) => i !== globalIndex));
        setCompletedTasks(completedTasks.filter((_, i) => i !== globalIndex));
    };

    const startEdit = (index: number) => {
        const globalIndex = indexOfFirstTask + index;
        setEditIndex(globalIndex);
        setEditInput(tasks[globalIndex]);
    };

    const saveEdit = (index: number) => {
        const globalIndex = indexOfFirstTask + index;
        if (editInput.trim()) {
            const updatedTasks = [...tasks];
            updatedTasks[globalIndex] = editInput;
            setTasks(updatedTasks);
            setEditIndex(null);
        }
    };

    const toggleComplete = (index: number) => {
        const globalIndex = indexOfFirstTask + index;
        const updatedCompletedTasks = [...completedTasks];
        updatedCompletedTasks[globalIndex] = !updatedCompletedTasks[globalIndex];
        setCompletedTasks(updatedCompletedTasks);
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

                {/* Danh sách task */}
                <ul className="mt-4 space-y-2">
                    {currentTasks.map((task, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center bg-gray-200 p-2 rounded-md transition ${currentCompletedTasks[index] ? "opacity-50 line-through" : ""}`}
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={currentCompletedTasks[index]}
                                    onChange={() => toggleComplete(index)}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                {editIndex === indexOfFirstTask + index ? (
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
                                {editIndex === indexOfFirstTask + index ? (
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

                {/* Phân trang */}
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        ← Trước
                    </button>

                    <span>Trang {currentPage} / {totalPages}</span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Sau →
                    </button>
                </div>
            </div>
        </div>
    );
}
