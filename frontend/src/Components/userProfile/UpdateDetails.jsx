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
    <section className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="sm:col-span-1 panel flex flex-col items-center justify-center p-4">
          <Profile className="h-72 sm:h-full sm:w-full" />
          <h1 className="hidden pb-2 text-sm font-semibold text-muted sm:block">
            Edit profile informations
          </h1>
        </div>

        <div className="sm:col-span-3 panel px-6 py-5">
          <h1 className="text-lg font-bold tracking-tight mb-4">
            General Inforamtion
          </h1>
          {alert.show && <Alert msg={alert.msg} show={setAlert} />}
          {!isLoading ? (
            <form action="">
              <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                <div>
                  <div className="flex flex-col mb-4">
                    <label className="field-label">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="field"
                      placeholder="First name"
                      onChange={(e) => handelChange(e)}
                      value={newUserDetails.firstName}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="field-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="field"
                      placeholder="last name"
                      onChange={(e) => handelChange(e)}
                      value={newUserDetails?.lastName}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="field-label">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="field"
                      placeholder="Username"
                      onChange={(e) => handelChange(e)}
                      value={newUserDetails?.username}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col mb-4">
                    <label className="field-label">
                      Birthday
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      className="field"
                      placeholder="your birth date"
                      onChange={(e) => handelChange(e)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="field-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="field"
                      placeholder="phone number"
                      onChange={(e) => handelChange(e)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="field-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="field"
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
