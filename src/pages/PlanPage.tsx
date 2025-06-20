import TaskSidebar from "../components/TaskSidebar";
import FloorPlanArea from "../components/FloorPlanArea";
import TaskDetailPanel from "../components/TaskDetailPanel";
import AddTaskModal from "../components/AddTaskModal";
import { usePlanPageLogic } from "../hooks/usePlanPageLogic";

export default function PlanPage() {
  const {
    currentUser,
    tasks,
    selectedTask,
    handleTaskSelect,
    showModal,
    handleCreateTask,
    handleCancelModal,
    handleTaskUpdate,
    handleAddTaskClick,
    imgRef,
  } = usePlanPageLogic();

  if (!currentUser) {
    return <div className="p-4 text-center">Please log in first.</div>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <TaskSidebar tasks={tasks} onSelect={handleTaskSelect} />

      <FloorPlanArea
        tasks={tasks}
        onTaskClick={handleTaskSelect}
        onAddTask={handleAddTaskClick}
        imgRef={imgRef}
      />

      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          onClose={() => handleTaskSelect(null)}
          onUpdate={handleTaskUpdate}
        />
      )}

      {showModal && (
        <AddTaskModal
          onSubmit={handleCreateTask}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
}
