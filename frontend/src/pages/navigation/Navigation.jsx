import { Outlet } from "react-router-dom";
import NavBar from "../../Components/navbar/NavBar";

const Navigation = () => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <NavBar />
      <div id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </div>
    </>
  );
};

export default Navigation;
