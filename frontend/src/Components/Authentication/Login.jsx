import React, { useState } from "react";

import { ReactComponent as Waves } from "../../assets/wave.svg";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import { login } from "../../services/userService";
import { setUser } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

//initial state

const INITIA_STATE = {
  username: "",
  password: "",
};

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [alert, setALert] = useState({
    show: false,
    msg: "",
  });

  //
  const [userTologIn, setUserToLogIn] = useState(INITIA_STATE);
  //
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handelSubmit = async (e) => {
    //
    e.preventDefault();
    if (userTologIn.username.length < 4) {
      setALert({
        show: true,
        msg: "please enter a valide username",
      });
    } else if (userTologIn.password.length < 8) {
      setALert({
        show: true,
        msg: "password must be at least 8 characters",
      });
    } else {
      //
      try {
        const data = await login(userTologIn);
        dispatch(setUser(data));
        navigateTo("/");
      } catch (error) {
        setALert({
          show: true,
          msg: "Bad credentials ! :)",
        });
      }
    }
  };

  //hadnelChange :

  const handelChange = (e) => {
    //set user state
    setUserToLogIn((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <section className=" flex justify-center">
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
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="your username "
              value={userTologIn.username}
              onChange={(e) => handelChange(e)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={userTologIn.password}
              onChange={(e) => handelChange(e)}
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
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5 ">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => handelSubmit(e)}
          >
            Submit
          </button>
        </form>
        <div className="mt-2 text-xs font-thin">
          if you don't have an account,please{" "}
          <Link
            to="/auth/register"
            className="font-semiBold text-blue-500 underline-offset-1 text-lg"
          >
            sing up
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 left-0 w-full -z-10 ">
        <Waves style={{ width: "100%", height: "100%" }} />
      </div>

      {alert.show && (
        <span className="absolute top-1/2 left-1/4 right-0 z-40">
          <Alert msg={alert.msg} show={setALert} />
        </span>
      )}
    </section>
  );
};

export default Login;
