import React, { useState } from "react";
import { ReactComponent as Illustration } from "../../assets/auth-ui.svg";

import { ReactComponent as UploadIcon } from "../../assets/upload.svg";

const Register = () => {
  const [showUploadImage, setUploadImage] = useState(false);

  return (
    <section className="grid grid-cols-2 mx-10 items-center mb-4">
      <div className=" mt-16 rounded-lg p-8 bg-gray-800 max-w-xl text-white col-span-1 shadow-md">
        <div className="heading-element">
          <img
            src="../../images/logo.png"
            alt="logo"
            className="mx-auto max-h-16 object-contain mb-2"
          />
          <h1 className="text-lg font-bold tracking-wider ">
            Welcome Create your account and join our community
            <span className="ml-1 border-b-4 w-20  border-main block"></span>
          </h1>
        </div>

        <form action="" className="mt-8">
          {!showUploadImage ? (
            <>
              <div class="mb-6">
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username here"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="firstName"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your firstName
                </label>
                <input
                  type="text"
                  id="firstName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="firstName here"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="lastName"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your lastName
                </label>
                <input
                  type="text"
                  id="lastName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="last name here"
                  required
                />
              </div>
              <div class="mb-6 relative">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type={"password"}
                  id="password"
                  class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setUploadImage(true)}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <UploadProfilePic />
              <button
                type="button"
                class="float-right mt-4 text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={() => setUploadImage(false)}
              >
                back
              </button>
            </>
          )}
        </form>
        {!showUploadImage ? (
          <div className="mt-2 text-xs font-thin">
            if you already have an account,please{" "}
            <a
              href="/auth/login"
              className="font-semiBold text-blue-500 underline-offset-1 text-lg"
            >
              sing in
            </a>
          </div>
        ) : (
          <>
            <div className="mt-2 font-medium">
              You can skipp adding profile pictrue{" "}
              <button
                type="button"
                class="ml-4 text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <div className=" mt-16 rounded-lg p-8  max-w-xl col-span-1">
        <Illustration style={{ height: "80%" }} />
      </div>
    </section>
  );
};

const UploadProfilePic = () => {
  return (
    <>
      <div className="flex items-center justify-center col-span-3">
        <label
          for="thmblineImage"
          className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:border-gray-600 shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
        >
          <div className="flex flex-col items-center justify-center ">
            <UploadIcon style={{ width: "35px", height: "35px" }} />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="thmblineImage"
            type="file"
            accept="image/*"
            className="hidden"
            required
          />
        </label>
      </div>
      <button
        type="button"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        upload photo
      </button>
    </>
  );
};

export default Register;
