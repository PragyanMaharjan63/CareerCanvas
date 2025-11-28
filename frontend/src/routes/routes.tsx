import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "../components/signin";
import Login from "../components/login";
import Home from "../components/home";
import { useBackend } from "../context/globalcontext";
import { useEffect, useState } from "react";
export default function Router() {
  const { Loggedin, checkAuth } = useBackend();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="font-3xl z-20 font-bold">Loading...</div>;
  return (
    <Routes>
      <Route
        path="/"
        element={Loggedin ? <Home /> : <Navigate to={"/login"} replace />}
      />
      <Route
        path="/signin"
        element={Loggedin ? <Navigate to={"/"} replace /> : <Signin />}
      />
      <Route
        path="/login"
        element={Loggedin ? <Navigate to={"/"} replace /> : <Login />}
      />
    </Routes>
  );
}
