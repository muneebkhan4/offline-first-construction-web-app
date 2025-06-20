import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { getDatabase } from "../db/database";
import type { ChecklistItem, TaskDocType } from "../db/task.schema";
import type { AppDatabase } from "../db/types";

export function usePlanPageLogic() {
  const currentUser = useUserStore((state) => state.currentUser);
  const [tasks, setTasks] = useState<TaskDocType[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [db, setDb] = useState<AppDatabase | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTaskCoords, setNewTaskCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!currentUser) return;

    const init = async () => {
      const dbInstance = await getDatabase();
      setDb(dbInstance);

      const taskDocs = await dbInstance.tasks
        .find()
        .where("userId")
        .equals(currentUser.id)
        .exec();
      const taskList: TaskDocType[] = taskDocs.map(
        (doc) => structuredClone(doc.toJSON()) as TaskDocType
      );
      setTasks(taskList);
    };

    init();
  }, [currentUser]);

  const defaultChecklist: ChecklistItem[] = [
    { id: crypto.randomUUID(), text: "Check item 1", status: "not_started" },
    { id: crypto.randomUUID(), text: "Check item 2", status: "not_started" },
    { id: crypto.randomUUID(), text: "Check item 3", status: "not_started" },
  ];

  const handleAddTaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewTaskCoords({ x, y });
    setShowModal(true);
  };

  const handleCreateTask = async (title: string) => {
    if (!db || !currentUser || !newTaskCoords) return;

    const newTask: TaskDocType = {
      id: Date.now().toString(),
      title,
      x: newTaskCoords.x,
      y: newTaskCoords.y,
      userId: currentUser.id,
      checklist: structuredClone(defaultChecklist),
    };

    await db.tasks.insert(newTask);
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
    setNewTaskCoords(null);
  };

  const handleTaskUpdate = async (updatedTask: TaskDocType) => {
    if (!db) return;
    await db.tasks.upsert(updatedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTaskId(null);
  };

  return {
    currentUser,
    tasks,
    selectedTask: tasks.find((t) => t.id === selectedTaskId) || null,
    handleTaskSelect: setSelectedTaskId,
    showModal,
    handleCreateTask,
    handleCancelModal: () => {
      setShowModal(false);
      setNewTaskCoords(null);
    },
    handleTaskUpdate,
    handleAddTaskClick,
    imgRef,
  };
}
