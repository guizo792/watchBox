import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import { login } from "../../services/userService";
import { setUser } from "../../store/user/user.action";
import { useDispatch } from "react-redux";
import { AuthShell, AuthToast, PasswordField, TextField } from "./AuthShell";

//initial state

const INITIA_STATE = {
  username: "",
  password: "",
};

const Login = () => {
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
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to like, comment and subscribe."
      footer={
        <>
          New to WatchBox?{" "}
          <Link
            to="/auth/register"
            className="font-semibold text-brand hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handelSubmit} noValidate>
        <TextField
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
          placeholder="your username"
          value={userTologIn.username}
          onChange={handelChange}
          required
        />
        <PasswordField
          id="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          value={userTologIn.password}
          onChange={handelChange}
          required
        />
        <label
          htmlFor="remember"
          className="flex cursor-pointer items-center gap-2 text-sm text-muted"
        >
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-line accent-[rgb(var(--color-brand))]"
          />
          Remember me
        </label>
        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
      </form>

      {alert.show && (
        <AuthToast>
          <Alert msg={alert.msg} show={setALert} />
        </AuthToast>
      )}
    </AuthShell>
  );
};

export default Login;
