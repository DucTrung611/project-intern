"use client";
import { useEffect, useMemo, useState } from "react";
import TodoItem from "./todo.item";

export interface ITodoItem {
	label: string;
	status: 'todo' | 'pending' | 'done' | 'inProgress';

}

export default function TodoApp() {
	const [tasks, setTasks] = useState<ITodoItem[]>([])
	const [inputValue, setInputValue] = useState<string>("")
	const [offset, setOffset] = useState<number>(1)
	const [limit, SetLimit] = useState<number>(3);



	const onAddTask = () => {
		setTasks((prev) => [...prev, {
			label: inputValue,
			status: 'todo'
		}])
		setInputValue("");
	}
	const onDelete = (index: number) => {
		setTasks((prev) => prev.filter((_, i) => i !== index));
	}

	// const onEdit = (index: number, updatedTask: ITodoItem) => {
	// 	setTasks((prevTasks) => {
	// 		const newTasks = [...prevTasks];
	// 		newTasks[index] = { ...updatedTask };
	// 		return newTasks;
	// 	});
	// };

	const onEdit = (indexInPage: number, updatedTask: ITodoItem) => {
		const indexTask = (offset - 1) * limit + indexInPage; // Chuyển đổi index trong trang thành index thực trong tasks
		setTasks((prevTasks) => {
			return prevTasks.map((task, index) => {
				// Nếu là task cần cập nhật thì thay bằng task mới, nếu không thì giữ nguyên
				return index === indexTask ? updatedTask : task;
			});
		});
	};


	const totalPages = Math.ceil(tasks.length / limit);

	const finalTasks = useMemo(() => {
		const start = (offset - 1) * limit;
		const end = start + limit;
		const result = tasks.slice(start, end)
		return result;
	}, [tasks, limit, offset])


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
					{finalTasks.map((task, index) => (
						<TodoItem
							key={index}
							index={index}
							task={task}
							onDelete={() => onDelete((offset - 1) * limit + index)}
							onEdit={onEdit}
						/>
					))}
				</ul>
				{/* Phân trang */}
				<div className="mt-4 flex justify-center gap-4">
					<button
						onClick={() => setOffset((prev) => Math.max(prev - 1, 1))}
						disabled={offset === 1}
						className={`px-4 py-2 rounded-md ${offset === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
							}`}
					>
						← Trước
					</button>

					<span className="flex align-middle">Trang {offset} / {totalPages || 1}</span>

					<button
						onClick={() => setOffset((prev) => Math.min(prev + 1, totalPages))}
						disabled={offset >= totalPages}
						className={`px-4 py-2 rounded-md ${offset >= totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
							}`}
					>
						Sau →
					</button>
				</div>
			</div>
		</div>
	);
}
