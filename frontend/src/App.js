import { Route, Routes } from "react-router";
import "./App.css";
import UploadVideo from "./Components/UploadVideo/uploadVideo";
import VideoPreview from "./Components/video-preview/VideoPreview";
import Home from "./pages/home/Home";
import Navigation from "./pages/navigation/Navigation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/video" element={<VideoPreview />} />
      </Route>
    </Routes>
  );
}

export default App;
