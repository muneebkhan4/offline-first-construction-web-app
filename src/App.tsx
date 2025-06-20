import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./stores/userStore";
import PlanPage from "./pages/PlanPage";
import LoginPage from "./pages/LoginPage";
import { useRxDBSyncInterval } from "./hooks/useRxDBSync";

function App() {
  const user = useUserStore((state) => state.currentUser);

  useRxDBSyncInterval();

  return (
    <BrowserRouter>
      <div className={user ? "pt-6" : ""}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={user ? <PlanPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
