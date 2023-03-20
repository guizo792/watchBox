import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonMain from "../Constants/ButtonMain";
import PasswordUpdate from "./PasswordUpdate";
import LoadingSpinner from "../../Components/loadingSpinner/spinner";
import Alert from "../Alert/Alert";
import { updateUser } from "../../services/userService";
import { setUser } from "../../store/user/user.action";
import { useNavigate } from "react-router";

import { ReactComponent as Profile } from "../../assets/profile.svg";

//
const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  birthday: "",
};

const UpdateDetails = () => {
  // states
  const appUser = useSelector((state) => state.appUser);
  const [newUserDetails, setNewUserDetails] = useState({
    ...INITIAL_STATE,
    firstName: appUser?.currentUser?.firstName,
    lastName: appUser?.currentUser?.lastName,
    username: appUser?.currentUser?.username,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    show: false,
  });

  // actions dispatcher
  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  // input changes handling
  const handelChange = (e) => {
    //
    setNewUserDetails((prevDetails) => {
      return {
        ...prevDetails,
        [e.target.name]: e.target.value,
      };
    });
  };

  // form submission handler

  const handelClick = async (e) => {
    //
    e.preventDefault();
    if (
      newUserDetails.firstName.length < 3 ||
      newUserDetails.lastName.length < 3
    ) {
      setAlert({
        msg: "first name and last name should be at least 3 characters",
        show: true,
      });
    } else if (newUserDetails.username.length < 4) {
      setAlert({
        msg: "username must be at least 4 characters",
        show: true,
      });
    } else {
      //
      try {
        setIsLoading(true);
        console.log(newUserDetails);
        const updatedUser = await updateUser(
          appUser.currentUser.id,
          newUserDetails
        );
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(setUser(updatedUser));
        navigateTo("/user/profile");
      } catch (error) {
        setAlert({
          show: true,
          msg: "couldn't update user",
        });
      }
    }
  };

  return (
    <section className="mt-10 mx-auto text-white max-w-6xl">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-gray-800 flex flex-col items-center justify-center rounded-md ">
          <Profile className="w-full" />

          <h1 className="font-bold text-white">Edit profile informations</h1>
        </div>

        <div className="col-span-3 bg-gray-800 rounded-md py-4 px-6">
          <h1 className="text-xl font-bold tracking-wider mb-4">
            General Inforamtion
          </h1>
          {alert.show && <Alert msg={alert.msg} show={setAlert} />}
          {!isLoading ? (
            <form action="">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold tracking-tight">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="bg-gray-600 outline-none border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4"
                      placeholder="First name"
                      onChange={(e) => handelChange(e)}
                      value={newUserDetails.firstName}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold tracking-tight">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="bg-gray-600 border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4 outline-none"
                      placeholder="last name"
                      onChange={(e) => handelChange(e)}
                      value={newUserDetails?.lastName}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold tracking-tight">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="bg-gray-600 border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4 outline-none"
                      placeholder="Username"
                      onChange={(e) => handelChange(e)}
                      value={newUserDetails?.username}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold tracking-tight">
                      Birthday
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      className="bg-gray-600 outline-none border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4"
                      placeholder="your birth date"
                      onChange={(e) => handelChange(e)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold tracking-tight">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="bg-gray-600 border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4 outline-none"
                      placeholder="phone number"
                      onChange={(e) => handelChange(e)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold tracking-tight">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="bg-gray-600 border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4 outline-none"
                      placeholder="Email"
                      onChange={(e) => handelChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <ButtonMain
                  name={"save"}
                  handelClick={(e) => handelClick(e)}
                  upload={false}
                />
              </div>
            </form>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
      <PasswordUpdate />
    </section>
  );
};

export default UpdateDetails;
