// components/ChecklistItem.tsx
import type { TaskDocType } from "../db/task.schema";

type ChecklistItemProps = {
  item: TaskDocType["checklist"][number];
  onStatusChange: (
    id: string,
    status: TaskDocType["checklist"][number]["status"]
  ) => void;
  onTextChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function ChecklistItem({
  item,
  onStatusChange,
  onTextChange,
  onDelete,
}: ChecklistItemProps) {
  const statusIcons: Record<
    TaskDocType["checklist"][number]["status"],
    string
  > = {
    not_started: "⏸️",
    in_progress: "🔄",
    blocked: "🚫",
    final_check: "🧐",
    done: "✅",
  };

  return (
    <div className="mb-4 space-y-1">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none select-none">
          {statusIcons[item.status]}
        </span>
        <input
          title="check List Item Name"
          className="w-full pl-10 border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg outline-none"
          value={item.text}
          onChange={(e) => onTextChange(item.id, e.target.value)}
        />
      </div>

      <select
        title="Check List Item Status"
        className="w-full border cursor-pointer focus:cursor-pointer border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg outline-none"
        value={item.status}
        onChange={(e) =>
          onStatusChange(
            item.id,
            e.target.value as TaskDocType["checklist"][number]["status"]
          )
        }
      >
        <option value="not_started">Not started</option>
        <option value="in_progress">In progress</option>
        <option value="blocked">Blocked</option>
        <option value="final_check">Final Check awaiting</option>
        <option value="done">Done</option>
      </select>

      <button
        onClick={() => onDelete(item.id)}
        className="bg-red-700 hover:bg-red-900 text-sm text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
