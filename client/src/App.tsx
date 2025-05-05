import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/welcome/:id" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
