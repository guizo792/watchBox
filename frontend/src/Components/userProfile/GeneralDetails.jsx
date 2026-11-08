import React from "react";

import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Detail = ({ label, children }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-muted">
      {label}
    </dt>
    <dd className="mt-0.5 font-semibold">{children}</dd>
  </div>
);

function GeneralDetails() {
  //
  const appUser = useSelector((state) => state.appUser);
  return (
    <div className="panel h-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight">
          Your general information
        </h1>
        <Link
          to={"./update"}
          className="btn-secondary !px-3 !py-2"
          aria-label="Edit profile"
          title="Edit profile"
        >
          <FaUserEdit size={18} />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      </div>
      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <Detail label="First name">{appUser?.currentUser?.firstName}</Detail>
        <Detail label="Last name">{appUser?.currentUser?.lastName}</Detail>
        <Detail label="Email">houcine@gmail.com</Detail>
        <Detail label="Birthday">20/01/2001</Detail>
        <Detail label="Phone number">+5548136454875</Detail>
      </dl>
    </div>
  );
}

export default GeneralDetails;
