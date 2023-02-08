import { Route, Routes } from "react-router";
import "./App.css";
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
  );
}

export default App;
