// db/types.ts
import type { RxCollection, RxDatabase } from "rxdb";
import type { UserDocType } from "./user.schema";
import type { TaskDocType } from "./task.schema";

export type UserCollection = RxCollection<UserDocType>;
export type TaskCollection = RxCollection<TaskDocType>;

export interface Collections {
  users: UserCollection;
  tasks: TaskCollection;
}

export type AppDatabase = RxDatabase<Collections>;
