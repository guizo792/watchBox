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
import Notifications from "./Components/notifications/Notifications";
import NotifPanel from "./Components/notifications/NotifPanel";
import Subscriptions from "./pages/subscriptions/subscripitons";
import LikedVideos from "./pages/likedVideos/likedVideos";
import SearchResults from "./pages/search/SearchResults";
import LiveStream from "./pages/liveStream/liveStream";
import LiveStreaming from "./pages/liveStream/liveStreaming";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <NotifPanel />
              <Notifications />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="/upload-video" element={<UploadVideo />} />
          <Route path="/videos" element={<VideoPreview />} />
          <Route
            path="/videos/find"
            element={
              <>
                <SearchResults />
              </>
            }
          />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile/update" element={<UpdateDetails />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/live-stream" element={<LiveStreaming />} />
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
