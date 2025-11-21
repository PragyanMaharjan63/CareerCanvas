import { Routes, Route } from "react-router-dom";
import Signin from "./components/signin";
import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (
    <>
      <div className="grid place-items-center h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
