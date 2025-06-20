// components/AddTaskModal.tsx
import { useState } from "react";

export default function AddTaskModal({
  onSubmit,
  onCancel,
}: {
  onSubmit: (title: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task name"
          className="bg-transparent text-black w-full border border-gray-300 p-2 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 text-red-600 py-2 outline-none focus:outline-none focus:ring-0 border-none focus:border-none bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 outline-none focus:outline-none text-white rounded hover:bg-blue-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!title.trim()}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
