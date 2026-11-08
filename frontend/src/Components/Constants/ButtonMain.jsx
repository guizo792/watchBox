import React from "react";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";

const ButtonMain = ({ name, handelClick, upload }) => {
  return (
    <button type="button" className="btn-primary" onClick={handelClick}>
      {name}
      {upload && <UploadIcon style={{ width: "20px", height: "20px" }} />}
    </button>
  );
};

export default ButtonMain;
