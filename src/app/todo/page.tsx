'use client';

import { useState } from 'react';

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<string>('');

    const addTask = (): void => {
        if (task.trim() === '') return;
        setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
        setTask('');
    };

    const toggleTaskCompletion = (id: number): void => {
        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const deleteTask = (id: number): void => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
            <div className="flex mb-4">
                <input
                    className="flex-grow p-2 border rounded"
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addTask}
                >
                    Add
                </button>
            </div>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id} className="flex items-center justify-between p-2 border-b">
                        <span
                            className={`flex-grow cursor-pointer ${t.completed ? 'line-through text-gray-500' : ''
                                }`}
                            onClick={() => toggleTaskCompletion(t.id)}
                        >
                            {t.text}
                        </span>
                        <button
                            className="text-red-500"
                            onClick={() => deleteTask(t.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
