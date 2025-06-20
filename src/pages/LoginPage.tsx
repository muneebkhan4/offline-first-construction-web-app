import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase } from "../db/database";
import { useUserStore } from "../stores/userStore";
import { v4 as uuid } from "uuid";
import type { UserDocType } from "../db/user.schema";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleLogin = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    try {
      const db = await getDatabase();
      const existing = await db.users
        .findOne({ selector: { name: trimmedName } })
        .exec();

      let user: UserDocType;
      if (existing) {
        user = existing.toJSON();
      } else {
        user = { id: uuid(), name: trimmedName };
        await db.users.insert(user);
      }

      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          className="w-full bg-transparent text-black placeholder-gray-500 border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
