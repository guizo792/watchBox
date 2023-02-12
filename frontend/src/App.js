import { Route, Routes } from "react-router";
import "./App.css";
import UploadVideo from "./pages/video-upload/UploadVideo.jsx";
import VideoPreview from "./Components/videoPreview/VideoPreview";
import Home from "./pages/home/Home";
import Navigation from "./pages/navigation/Navigation";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/videos" element={<VideoPreview />} />
      </Route>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
