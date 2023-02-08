import { Route, Routes } from "react-router";
import "./App.css";
import UploadVideo from "./Components/UploadVideo/UploadVideo";
import Home from "./pages/home/Home";
import Navigation from "./pages/navigation/Navigation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/upload-video" element={<UploadVideo />} />
      </Route>
    </Routes>
  );
}

export default App;
