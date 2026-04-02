import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./components/MainLayout";

const App = () => {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white text-sm">
        Loading…
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
      <Route path="/*" element={user ? <MainLayout /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
