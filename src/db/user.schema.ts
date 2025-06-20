import type { RxJsonSchema } from "rxdb";

// Define the TypeScript type for a user document
export type UserDocType = {
  id: string;
  name: string;
};

// Define the RxDB schema for the user collection
export const userSchema: RxJsonSchema<UserDocType> = {
  title: "user",
  version: 0,
  description: "App user",
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
    },
  },
  required: ["id", "name"],
};
