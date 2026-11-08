import React, { useState } from "react";
import ButtonMain from "../Constants/ButtonMain";
import Alert from "../Alert/Alert";
import { useSelector } from "react-redux";
import { changeUserPassword } from "../../services/userService";

const INITIAL_STATE = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const PasswordUpdate = () => {
  const appUser = useSelector((state) => state.appUser);

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
  });

  const [passwords, setPasswords] = useState(INITIAL_STATE);

  // handel changes for inputs
  const handelChange = (e) => {
    //
    setPasswords((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  //handel submit

  const handelSubmit = async (e) => {
    //
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      //
      setAlert({
        show: true,
        msg: "new password and confirm password are not the same",
      });
    }
    if (passwords.currentPassword.length < 3 || passwords.newPassword < 3) {
      setAlert({
        show: true,
        msg: "password must be more than 3 characters",
      });
    } else {
      //
      const res = await changeUserPassword(
        appUser?.currentUser?.id,
        passwords.currentPassword,
        passwords.newPassword
      );

      console.log(res);

      if (res) {
        const ok = window.alert("the password was updated successfully");

        setPasswords(INITIAL_STATE);
      } else {
        setAlert({
          show: true,
          msg: "error while updating password check the current password",
        });
      }
    }
  };

  return (
    <div className="sm:grid sm:grid-cols-4 mb-8">
      {/*  */}
      <div className="col-span-1"></div>
      {/*  */}
      <div className="col-span-3">
        <div className="panel mt-4 px-6 py-5">
          <h1 className="text-lg font-bold tracking-tight mb-4">
            Change Password
          </h1>

          {alert.show && <Alert msg={alert.msg} show={setAlert} />}

          <form>
            <div className="sm:grid sm:grid-cols-2 sm:gap-4">
              <div>
                <div className="flex flex-col mb-4">
                  <label className="field-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="field"
                    placeholder="current password"
                    value={passwords.currentPassword}
                    onChange={(e) => handelChange(e)}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className={"field-label"}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={
                      "field" +
                      (passwords.confirmPassword !== "" &&
                      passwords.newPassword === passwords.confirmPassword
                        ? " focus:!border-green-600"
                        : " focus:!border-red-600")
                    }
                    placeholder="Confirm provided Password"
                    value={passwords.confirmPassword}
                    onChange={(e) => handelChange(e)}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col mb-4">
                  <label className="field-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className="field"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) => handelChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <ButtonMain
                upload={false}
                name={"change password"}
                handelClick={handelSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
