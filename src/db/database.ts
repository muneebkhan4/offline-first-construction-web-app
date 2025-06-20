// db/database.ts
import { createRxDatabase, removeRxDatabase } from "rxdb";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";
import { userSchema } from "./user.schema";
import { taskSchema } from "./task.schema";
import { addRxPlugin } from "rxdb/plugins/core";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import type { AppDatabase, Collections } from "./types";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

// Add necessary plugins
addRxPlugin(RxDBQueryBuilderPlugin);
if (ENVIRONMENT === "development") {
  addRxPlugin(RxDBDevModePlugin);
}

// LocalStorage adapter with schema validation
const storage = wrappedValidateAjvStorage({
  storage: getRxStorageLocalstorage(),
});

let dbPromise: Promise<AppDatabase> | null = null;

// Utility to remove DB in dev
export const removeDB = async () => {
  if (ENVIRONMENT === "development") {
    await removeRxDatabase("constructiondb", getRxStorageLocalstorage());
    console.log("🧹 RxDB removed");
  }
};

// Get or create the DB instance
export const getDatabase = async (): Promise<AppDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = createRxDatabase<Collections>({
    name: "constructiondb",
    storage,
  }).then(async (db) => {
    await db.addCollections({
      users: { schema: userSchema },
      tasks: { schema: taskSchema },
    });

    return db;
  });

  return dbPromise;
};
