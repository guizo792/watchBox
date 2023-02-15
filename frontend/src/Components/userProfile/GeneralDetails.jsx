import React from "react";

import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function GeneralDetails() {
  //
  const appUser = useSelector((state) => state.appUser);
  return (
    <div className="w-full py-3 px-4 text-white">
      <h1 className="tracking-wider font-bold text-xl">
        Your general infromation
        <Link
          to={"./update"}
          className="inline-block float-right cursor-pointer"
        >
          <FaUserEdit size={25} />
        </Link>
        <span className="w-20 border border-b-3 border-main block mt-1"></span>
      </h1>
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 items-cente">
          <div className="col-span-1">
            <p className="text-gray-300"> First Name</p>
            <p className=" font-semibold"> {appUser?.currentUser?.firstName}</p>
          </div>
          <div className="col-span-1">
            <p className="text-gray-300"> Last Name</p>
            <p className="font-semibold">{appUser?.currentUser?.lastName}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 items-cente mt-3">
          <div className="col-span-1">
            <p className="text-gray-300"> Email</p>
            <p className=" font-semibold"> houcine@gmail.com</p>
          </div>
          <div className="col-span-1">
            <p className="text-gray-300"> Birthday</p>
            <p className="font-semibold"> 20/01/2001</p>
          </div>
        </div>
        <div className="grid grid-cols-2 items-cente mt-3">
          <div className="col-span-1">
            <p className="text-gray-300"> Phone number</p>
            <p className=" font-semibold"> +5548136454875</p>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default GeneralDetails;
