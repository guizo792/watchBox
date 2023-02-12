import React, { useState } from "react";

import { ReactComponent as Waves } from "../../assets/wave.svg";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <section className="flex justify-center">
      <div className=" mt-16 rounded-lg p-8 bg-gray-800 max-w-xl text-white">
        <div className="heading-element">
          <img
            src="../../images/logo.png"
            alt="logo"
            className="mx-auto max-h-16 object-contain mb-2"
          />
          <h1 className="text-lg font-bold tracking-wider ">
            Welcome Back , kindly enter your credintails
            <span className="ml-1 border-b-4 w-20  border-main block"></span>
          </h1>
        </div>

        <form action="" className="mt-8">
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
              placeholder="name@flowbite.com"
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
              type={showPass ? "text" : "password"}
              id="password"
              class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <span
              className="absolute z-30 right-2 bottom-2 cursor-pointer"
              onClick={() => {
                setShowPass((prevState) => !prevState);
              }}
            >
              {!showPass ? (
                <AiTwotoneEye color="white" size={22} />
              ) : (
                <AiTwotoneEyeInvisible color="white" size={22} />
              )}
            </span>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5 ">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <div className="mt-2 text-xs font-thin">
          if you don't have an account,please{" "}
          <a
            href="/auth/register"
            className="font-semiBold text-blue-500 underline-offset-1 text-lg"
          >
            sing up
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 left-0 w-full -z-10 ">
        <Waves style={{ width: "100%", height: "100%" }} />
      </div>
    </section>
  );
};

export default Login;
