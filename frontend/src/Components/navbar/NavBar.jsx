import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { ReactComponent as NotificationIcon } from "../../assets/notification.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotificationPanel } from "../../store/notifications/notification.action";
import SearchBar from "../search/SearchBar";

const NavBar = () => {
  // menu dropdown state :
  const [isOpen, setIsOpen] = useState(false);

  // global states : application user state
  const appUser = useSelector((state) => state.appUser);
  const notification = useSelector((state) => state.notifications);

  //console.log(appUser);

  //dispatch
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to={"/"} className="flex flex-shrink-0 items-center">
              <img
                className="block h-9 w-auto lg:hidden"
                src="/images/logo.png"
                alt="share it"
              />
              <img
                className="hidden h-9 w-auto lg:block"
                src="./images/logo.png"
                alt="share it"
              />
            </Link>
            <div className="hidden w-full sm:ml-6 sm:block">
              <div className="flex gap-4 items-center">
                <Link
                  to="/"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </Link>

                {/* <Link
                  to="#a"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </Link> */}

                <Link
                  to="#a"
                  className="overflow-hidden text-gray-300 max-w-fit hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
                  style={{ minInlineSize: " fitContent" }}
                >
                  About us
                </Link>

                {/* <Link
                  to="#a"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  More
                </Link> */}
                <div className="w-full px-4">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
            {appUser?.isLoggedIn && (
              <>
                <Link
                  to={"/upload-video"}
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <UploadIcon
                    style={{ width: "24px", height: "24px" }}
                    title="upload video"
                  />
                </Link>
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 relative"
                  onClick={() => dispatch(setShowNotificationPanel())}
                >
                  <NotificationIcon
                    style={{ width: "24px", height: "24px" }}
                    title="notifications"
                  />
                  {notification?.newNotificationReceived && (
                    <span className="absolute h-2 w-2 rounded-full bg-main top-0 right-0"></span>
                  )}
                </button>
              </>
            )}

            <div className="relative ml-3">
              <button
                className=" flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                data-dropdown-toggle="dropdown"
                onClick={() => setIsOpen((prevState) => !prevState)}
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    !appUser.isLoggedIn
                      ? "/images/user.png"
                      : appUser?.currentUser?.profilePicture
                  }
                  alt="profile "
                />
              </button>

              {isOpen && (
                <div
                  className=" absolute divide-y right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  onMouseLeave={() => setIsOpen((prevState) => !prevState)}
                >
                  {appUser.isLoggedIn ? (
                    <>
                      <Link
                        to="/user/profile"
                        className="block px-4 py-2 text-sm text-gray-800 transition duration-300 hover:bg-gray-600 hover:text-white rounded-md"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                      <a
                        href="#aa"
                        className="block px-4 py-2 text-sm text-gray-800 transition duration-300 hover:bg-gray-600 hover:text-white rounded-md"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        Settings
                      </a>
                      <Link
                        to="/auth/login"
                        className="block px-4 py-2 text-sm text-gray-800 transition duration-300 hover:bg-gray-600 hover:text-white rounded-md"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                        onClick={() => localStorage.clear()}
                      >
                        Sign out
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        className="block px-4 py-2 text-sm text-gray-800 transition duration-300 hover:bg-gray-600 hover:text-white rounded-md"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <a
            href="#aa"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#aa"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>
          <a
            href="#a"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#aa"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
