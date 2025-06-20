// hooks/useRxDBSync.ts
import { useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { getDatabase } from "../db/database";
import type { RxDatabase } from "rxdb";
import type { UserDocType } from "../db/user.schema";
import type { TaskDocType } from "../db/task.schema";

// Explicitly type the collections RxDB holds
type Collections = {
  users: import("rxdb").RxCollection<UserDocType>;
  tasks: import("rxdb").RxCollection<TaskDocType>;
};

// Set Base url
const BASE_URL = "http://localhost:3001";

// Hook to automatically sync RxDB with mock JSON server
export function useRxDBSyncInterval() {
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    if (!currentUser) return;

    const syncNow = async () => {
      try {
        const db: RxDatabase<Collections> = await getDatabase();

        // Fetch all local users and current user's tasks
        const users = await db.users.find().exec();
        const tasks = await db.tasks
          .find()
          .where("userId")
          .equals(currentUser.id)
          .exec();

        // Sync each user to mock server
        await Promise.all(
          users.map((userDoc) => {
            const user = structuredClone(userDoc.toJSON()) as UserDocType;
            return axios.post(`${BASE_URL}/users`, user).catch((err) => {
              if (err.response?.status !== 409) {
                console.error("User sync error", err);
              }
            });
          })
        );

        // Sync each task to mock server
        await Promise.all(
          tasks.map((taskDoc) => {
            const task = structuredClone(taskDoc.toJSON()) as TaskDocType;
            return axios.post(`${BASE_URL}/tasks`, task).catch((err) => {
              if (err.response?.status !== 409) {
                console.error("Task sync error", err);
              }
            });
          })
        );

        console.log("✅ Sync successful");
      } catch (err) {
        console.error("❌ Sync failed", err);
      }
    };

    // Sync immediately if user comes back online
    const handleOnline = () => {
      console.log("📶 Back online. Syncing...");
      syncNow();
    };

    // Set up sync every 1 minute
    const interval = setInterval(syncNow, 60 * 1000);

    // Listen for online event
    window.addEventListener("online", handleOnline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
    };
  }, [currentUser]);
}
