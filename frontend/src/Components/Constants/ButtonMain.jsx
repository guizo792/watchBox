import React from "react";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";

const ButtonMain = ({ name, handelClick }) => {
  return (
    <button
      className="bg-main px-4 py-2  rounded shadow-md text-sm font-semibold text-white transition duration-500 ease-in-out hover:scale-95 hover:shadow-2xl"
      onClick={handelClick}
    >
      <span className="flex items-center gap-1">
        {name}
        <UploadIcon style={{ width: "24px", height: "24px" }} />
      </span>
    </button>
  );
};

export default ButtonMain;
