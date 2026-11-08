import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotificationPanel } from "../../store/notifications/notification.action";
import SearchBar from "../search/SearchBar";
import { CiStreamOn } from "react-icons/ci";
import { BiVideoPlus } from "react-icons/bi";
import {
  MdOutlineNotificationsNone,
  MdSearch,
  MdClose,
} from "react-icons/md";

const iconButton =
  "relative rounded-full p-2 text-muted transition-colors hover:bg-surface-sunken hover:text-ink";
const menuPanel =
  "absolute right-0 top-full z-50 mt-2 w-52 origin-top-right overflow-hidden rounded-xl border border-line bg-white p-1 shadow-card-hover";
const menuItem =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-sunken";

const NavBar = () => {
  // menu dropdown state :
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);

  // navbar mobile
  const [navShow, setNavShow] = useState(false);

  // global states : application user state
  const appUser = useSelector((state) => state.appUser);
  const notification = useSelector((state) => state.notifications);

  //dispatch
  const dispatch = useDispatch();

  // Close the dropdowns on outside click or Escape
  const uploadRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    const onPointerDown = (e) => {
      if (!uploadRef.current?.contains(e.target)) setIsUploadMenuOpen(false);
      if (!profileRef.current?.contains(e.target)) setIsOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsUploadMenuOpen(false);
        setIsOpen(false);
        setNavShow(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 sm:px-6 lg:px-8">
        <button
          type="button"
          className={iconButton + " sm:hidden"}
          aria-label={navShow ? "Close search" : "Search"}
          aria-controls="mobile-search"
          aria-expanded={navShow}
          onClick={() => setNavShow((prevState) => !prevState)}
        >
          {navShow ? <MdClose size={24} /> : <MdSearch size={24} />}
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img className="h-9 w-auto rounded-lg" src="/images/logo.png" alt="" />
          <span className="hidden text-lg font-bold tracking-tight text-ink sm:inline">
            Watch<span className="text-brand">Box</span>
          </span>
        </Link>

        {/* One SearchBar for every breakpoint: inline on desktop, a dropdown row on phones */}
        <div
          id="mobile-search"
          className={
            (navShow
              ? "absolute inset-x-0 top-full border-b border-line bg-white px-3 py-3 "
              : "hidden ") +
            "sm:static sm:mx-auto sm:block sm:w-full sm:max-w-xl sm:flex-1 sm:border-0 sm:bg-transparent sm:p-0"
          }
        >
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
          {appUser?.isLoggedIn && (
            <>
              <div className="relative" ref={uploadRef}>
                <button
                  type="button"
                  className={iconButton}
                  aria-label="Create"
                  aria-haspopup="menu"
                  aria-expanded={isUploadMenuOpen}
                  onClick={() => setIsUploadMenuOpen((prevState) => !prevState)}
                >
                  <BiVideoPlus size={26} />
                </button>
                {isUploadMenuOpen && (
                  <div className={menuPanel} role="menu">
                    <Link to="/upload-video" className={menuItem} role="menuitem">
                      <UploadIcon style={{ width: "22px", height: "22px" }} />
                      <span>Upload video</span>
                    </Link>
                    <a
                      href="/live-stream"
                      className={menuItem}
                      role="menuitem"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CiStreamOn size={22} /> Go live
                    </a>
                  </div>
                )}
              </div>

              <button
                type="button"
                className={iconButton}
                aria-label="Notifications"
                onClick={() => dispatch(setShowNotificationPanel())}
              >
                <MdOutlineNotificationsNone size={26} />
                {notification?.newNotificationReceived && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-white" />
                )}
              </button>
            </>
          )}

          <div className="relative ml-1" ref={profileRef}>
            <button
              type="button"
              className="flex rounded-full ring-2 ring-transparent transition hover:ring-line"
              aria-label="Account menu"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prevState) => !prevState)}
            >
              <img
                className="h-9 w-9 rounded-full bg-surface-sunken object-cover"
                src={
                  (appUser.isLoggedIn && appUser?.currentUser?.profilePicture) ||
                  "/images/user.png"
                }
                alt=""
              />
            </button>

            {isOpen && (
              <div className={menuPanel} role="menu">
                {appUser.isLoggedIn ? (
                  <>
                    <Link to="/user/profile" className={menuItem} role="menuitem">
                      Your Profile
                    </Link>
                    <a href="#aa" className={menuItem} role="menuitem">
                      Settings
                    </a>
                    <Link
                      to="/auth/login"
                      className={menuItem + " text-brand"}
                      role="menuitem"
                      onClick={() => localStorage.clear()}
                    >
                      Sign out
                    </Link>
                  </>
                ) : (
                  <Link to="/auth/login" className={menuItem} role="menuitem">
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default NavBar;
