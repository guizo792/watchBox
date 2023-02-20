import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import "./sidebarNavStyles.css";

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav-links">
      <Link to={"/"} className="sidebar-nav-link">
        <Icon icon="ic:round-home" className="sidebar-nav-icon" />
        <span>Home</span>
      </Link>
      <Link to={"/subscriptions"} className="sidebar-nav-link">
        <Icon
          icon="material-symbols:subscriptions"
          className="sidebar-nav-icon"
        />
        <span>Subscriptions</span>
      </Link>
      <Link to={"/liked-videos"} className="sidebar-nav-link">
        <Icon icon="bxs:like" className="sidebar-nav-icon" />
        <span>Liked Videos</span>
      </Link>
    </ul>
  );
};

export default SidebarNav;
