import { Route, Routes } from "react-router";
import "./App.css";
import UploadVideo from "./pages/video-upload/UploadVideo.jsx";
import VideoPreview from "./pages/videoPreview/VideoPreview";
import Home from "./pages/home/Home";
import Navigation from "./pages/navigation/Navigation";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { Fragment } from "react";
import GoTopBtn from "./Components/goTopBtn/goTopBtn";
import UserProfile from "./Components/userProfile/UserProfile";
import UpdateDetails from "./Components/userProfile/UpdateDetails";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/upload-video" element={<UploadVideo />} />
          <Route path="/videos" element={<VideoPreview />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile/update" element={<UpdateDetails />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <GoTopBtn />
    </Fragment>
  );
}

export default App;
