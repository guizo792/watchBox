import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

import "./sidebarNavStyles.css";

const LINKS = [
  { to: "/", label: "Home", icon: "ic:round-home", end: true },
  {
    to: "/subscriptions",
    label: "Subscriptions",
    icon: "material-symbols:subscriptions",
  },
  { to: "/liked-videos", label: "Liked Videos", icon: "bxs:like" },
];

const linkClasses = ({ isActive }) =>
  [
    "flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
    "sm:rounded-lg sm:py-2.5",
    isActive ? "bg-brand-soft text-brand" : "text-ink hover:bg-surface-sunken",
  ].join(" ");

// Vertical list on desktop, horizontally scrollable pill row on phones.
const SidebarNav = () => (
  <nav aria-label="Primary" className="border-b border-line sm:border-0">
    <ul className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-2 sm:flex-col sm:gap-1 sm:overflow-visible sm:px-3 sm:py-4">
      {LINKS.map(({ to, label, icon, end }) => (
        <li key={to}>
          <NavLink to={to} end={end} className={linkClasses}>
            <Icon icon={icon} className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default SidebarNav;
