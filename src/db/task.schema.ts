// db/task.schema.ts
import type { RxJsonSchema } from "rxdb";

export interface ChecklistItem {
  id: string;
  text: string;
  status: "not_started" | "in_progress" | "blocked" | "final_check" | "done";
}

export interface TaskDocType {
  id: string;
  title: string;
  x: number;
  y: number;
  userId: string;
  checklist: ChecklistItem[];
}

// Define the schema
const taskSchemaLiteral: RxJsonSchema<TaskDocType> = {
  title: "task",
  version: 0,
  description: "Construction task",
  type: "object",
  primaryKey: "id",
  keyCompression: false,
  additionalProperties: false,
  properties: {
    id: { type: "string", maxLength: 100 },
    title: { type: "string" },
    x: { type: "number" },
    y: { type: "number" },
    userId: { type: "string" },
    checklist: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          text: { type: "string" },
          status: {
            type: "string",
            enum: [
              "not_started",
              "in_progress",
              "blocked",
              "final_check",
              "done",
            ],
          },
        },
        required: ["id", "text", "status"],
        additionalProperties: false,
      },
    },
  },
  required: ["id", "title", "x", "y", "userId", "checklist"],
};

export const taskSchema = taskSchemaLiteral;
