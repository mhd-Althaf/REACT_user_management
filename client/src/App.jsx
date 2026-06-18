import { Routes, Route } from "react-router-dom";
import AdminUsersPage from "./pages/AdminUsersPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
    
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />

        <Route path="/admin/users" element={<AdminRoute> <AdminUsersPage /> </AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;