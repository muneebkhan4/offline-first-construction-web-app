// components/TaskDetailPanel.tsx
import { useState } from "react";
import type { TaskDocType } from "../db/task.schema";
import ChecklistItem from "./ChecklistItem";
import ModalHeader from "./ModalHeader";

type Props = {
  task: TaskDocType;
  onUpdate: (updated: TaskDocType) => void;
  onClose: () => void;
};

export default function TaskDetailPanel({ task, onUpdate, onClose }: Props) {
  const [title, setTitle] = useState<string>(task.title);
  const [checklist, setChecklist] = useState<TaskDocType["checklist"]>(
    task.checklist
  );

  const handleStatusChange = (
    id: string,
    status: TaskDocType["checklist"][number]["status"]
  ) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleTextChange = (id: string, text: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleDelete = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    setChecklist((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: "",
        status: "not_started",
      },
    ]);
  };

  const handleSave = () => {
    onUpdate({ ...task, title, checklist });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-6 border border-gray-300">
          <ModalHeader title="Edit Task" onClose={onClose} />

          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              title="title"
              className="w-full border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <h4 className="font-semibold text-gray-800 mb-3">Checklist</h4>

          {checklist.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onStatusChange={handleStatusChange}
              onTextChange={handleTextChange}
              onDelete={handleDelete}
            />
          ))}

          <button
            onClick={handleAddItem}
            className="mt-2 bg-transparent text-sm font-medium text-green-800 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            + Add Item
          </button>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
