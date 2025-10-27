import { Login, Signin } from "./components/Auth";

function App() {
  return (
    <>
      <div className="grid place-items-center h-screen text-white">
        Hello world
        <Login />
        <Signin />
      </div>
    </>
  );
}

export default App;
