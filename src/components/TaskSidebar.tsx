import type { TaskDocType } from "../db/task.schema";

export default function TaskSidebar({
  tasks,
  onSelect,
}: {
  tasks: TaskDocType[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-[20vw] max-w-xs bg-white border-r border-gray-300 p-4 overflow-y-auto text-gray-800">
      <h2 className="text-lg font-semibold mb-2">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => onSelect(task.id)}
            className="text-sm cursor-pointer hover:text-blue-600 transition"
          >
            🛠 {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
