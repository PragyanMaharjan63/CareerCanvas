import Router from "./routes/routes";
import { BackendProvider } from "./context/globalcontext";
function App() {
  return (
    <>
      <BackendProvider>
        <div className="grid place-items-center h-screen text-white">
          <Router />
        </div>
      </BackendProvider>
    </>
  );
}

export default App;
