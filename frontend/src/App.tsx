import { Routes, Route } from "react-router-dom";
import Signin from "./components/signin";
import Login from "./components/login";

function App() {
  return (
    <>
      <div className="grid place-items-center h-screen text-white">
        <Routes>
          <Route path="/" element={<p>this</p>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
