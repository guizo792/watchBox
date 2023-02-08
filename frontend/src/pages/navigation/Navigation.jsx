import { Outlet } from "react-router-dom";
import NavBar from "../../Components/navbar/NavBar";

const Navigation = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Navigation;
