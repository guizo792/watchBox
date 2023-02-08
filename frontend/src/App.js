import { Route, Routes } from "react-router";
import "./App.css";
<<<<<<< HEAD
import NavBar from "./Components/navbar/NavBar";
import UploadVideo from "./Components/UploadVideo/uploadVideo";

function App() {
  return (
    <>
      <NavBar />
      <UploadVideo />
    </>
=======
import Home from "./pages/home/Home";
import Navigation from "./pages/navigation/Navigation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
      </Route>
    </Routes>
>>>>>>> 571bde8765525911db68d4e801fdc82ae437828a
  );
}

export default App;
