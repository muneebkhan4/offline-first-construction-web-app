import type { TaskDocType } from "../db/task.schema";
import floorplan from "../assets/floorplan.png";
import type { RefObject, MouseEvent } from "react";

export default function FloorPlanArea({
  tasks,
  onTaskClick,
  onAddTask,
  imgRef,
}: {
  tasks: TaskDocType[];
  onTaskClick: (id: string) => void;
  onAddTask: (e: MouseEvent<HTMLDivElement>) => void;
  imgRef: RefObject<HTMLImageElement | null>;
}) {
  return (
    <div className="flex flex-1 items-center justify-center relative">
      <div
        onClick={onAddTask}
        className="relative w-[65vw] h-[75vh] cursor-crosshair"
      >
        <img
          src={floorplan}
          ref={imgRef}
          alt="Floor Plan"
          className="absolute inset-0 w-full h-full"
        />

        {tasks.map((task) => (
          <div
            key={task.id}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group"
            style={{ left: `${task.x}%`, top: `${task.y}%` }} // Only dynamic part
            onClick={(e) => {
              e.stopPropagation();
              onTaskClick(task.id);
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block 
                bg-white border border-yellow-600 text-red-600 font-bold text-xs px-2 py-1 rounded shadow-md 
                whitespace-normal break-words min-w-[8ch] max-w-[16ch] text-center"
              >
                {task.title}
              </div>

              {/* Pin Marker */}
              <div className="relative w-6 h-8 -mb-3 z-10 flex items-center justify-center">
                {/* Pin background with white fill */}
                <div className="absolute w-full h-full bg-white rounded-full scale-[1.25] clip-path-pin" />

                {/* Red BU pin */}
                <div className="relative w-full h-full bg-red-600 flex items-center justify-center clip-path-pin">
                  <span className="text-white font-bold text-[0.6rem] uppercase mt-[-6px]">
                    BU
                  </span>
                </div>
              </div>

              {/* Bottom block */}
              <div className="w-6 h-5 bg-yellow-200 border border-yellow-600 shadow-sm flex items-center justify-center z-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
