import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
