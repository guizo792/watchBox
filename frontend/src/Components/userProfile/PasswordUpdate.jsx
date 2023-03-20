import React, { useState } from "react";
import ButtonMain from "../Constants/ButtonMain";
import Alert from "../Alert/Alert";

const PasswordUpdate = () => {
  const [alert, setAlert] = useState({
    show: true,
    msg: "msg",
  });
  return (
    <div className="grid grid-cols-4 mb-4">
      <div className="col-span-1"></div>
      <div className="col-span-3">
        <div className="mt-4 bg-gray-800 py-4 px-6 rounded">
          <h1 className="font-bold text-xl tracking wider mb-4">
            Change Password
          </h1>

          {alert.show && <Alert msg={alert.msg} show={setAlert} />}

          <form action="">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex flex-col mb-4">
                  <label className="font-semibold tracking-tight">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="bg-gray-600 outline-none border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4"
                    placeholder="current password"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="font-semibold tracking-tight">
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    name="confirmPassword"
                    className="bg-gray-600 outline-none border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4"
                    placeholder="Confirm provided Password"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col mb-4">
                  <label className="font-semibold tracking-tight">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className="bg-gray-600 border-2 border-gray-600 focus:border-blue-600 rounded-md h-10 px-4 outline-none"
                    placeholder="New Password"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <ButtonMain upload={false} name={"change password"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
