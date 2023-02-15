import React, { useState } from "react";
import { ReactComponent as Illustration } from "../../assets/auth-ui.svg";

import { ReactComponent as UploadIcon } from "../../assets/upload.svg";

import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

// firebase imports
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { database } from "../../Config/firebaseConfig";
import { register } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/user/user.action";

// initail states
const initialState = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  profilePicture: "",
};

// comonents

const Register = () => {
  // localhost
  const [showUploadImage, setUploadImage] = useState(false);
  const [newUser, setNewUser] = useState(initialState);
  const [alert, setALert] = useState({
    show: false,
    msg: "",
  });

  //global state
  // const appUser = useSelector((state) => state.appUser);
  const dsipatch = useDispatch();

  //console.log(appUser);
  // navigation
  const navigateTo = useNavigate();

  const handelChange = (e) => {
    //
    setNewUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
    //console.log(newUser);
  };

  const handelNext = () => {
    //

    if (newUser.username.length < 4) {
      setALert({
        show: true,
        msg: "pleas enter a valid userame : username is at least 4 characters",
      });
    } else if (newUser.firstName.length < 3 || newUser.lastName.length < 3) {
      setALert({
        show: true,
        msg: "pleas enter a valid name first name and last name should have at least 3 characters",
      });
    } else if (newUser.password.length < 8) {
      setALert({
        show: true,
        msg: "password must be at least 8 characters",
      });
    } else if (newUser.password !== newUser.confirmPassword) {
      setALert({
        show: true,
        msg: "please enter the correct password to confirm",
      });
    } else {
      //show upload image component
      setUploadImage(true);
    }
    //
  };

  const handelSubmit = async (e) => {
    //
    e.preventDefault();
    //
    const data = await register(newUser);
    dsipatch(setUser(data));
    navigateTo("/");
  };

  return (
    <section className="grid grid-cols-2 mx-10 items-center mb-4 relative">
      <div className=" mt-16 rounded-lg p-8 bg-gray-800 max-w-xl text-white col-span-1 shadow-md">
        <div className="heading-element">
          <img
            src="../../images/logo.png"
            alt="logo"
            className="mx-auto max-h-16 object-contain mb-2"
          />
          <h1 className="text-lg font-bold tracking-wider ">
            Welcome Create your account and join our community
            <span className="ml-1 border-b-4 w-20  border-main block"></span>
          </h1>
        </div>

        <form action="" className="mt-8">
          {!showUploadImage ? (
            <>
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
                  value={newUser.username}
                  onChange={(e) => handelChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username here"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your firstName
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={(e) => handelChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="firstName here"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your lastName
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={(e) => handelChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="last name here"
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
                  type={"password"}
                  name="password"
                  value={newUser.password}
                  onChange={(e) => handelChange(e)}
                  id="password"
                  className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="confirmaPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type={"password"}
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={(e) => handelChange(e)}
                  id="confirmPassword"
                  className={
                    (newUser.confirmPassword !== "" &&
                    newUser.confirmPassword !== newUser.password
                      ? "dark:border-red-600 "
                      : "dark:border-gray-600 ") +
                    "relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white"
                  }
                  required
                />
              </div>
              <button
                type="button"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handelNext}
              >
                Next
              </button>
            </>
          ) : newUser.profilePicture === "" ? (
            <>
              <UploadProfilePic setNewUser={setNewUser} />
              <button
                type="button"
                className="float-right mt-4 text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={() => setUploadImage(false)}
              >
                back
              </button>
            </>
          ) : (
            <>
              <div className="mt-2 text-white">
                <h1 className="font-bold text-lg mb-2">Confirm information</h1>
                <div className="flex gap-8 mt-2">
                  <p className="font-bold text-md">username:</p>
                  <p className="">{newUser.username}</p>
                </div>
                <div className="flex gap-8 mt-2">
                  <p className="font-bold text-md">first Name:</p>
                  <p className="">{newUser.firstName}</p>
                </div>
                <div className="flex gap-8 mt-2">
                  <p className="font-bold text-md">Last Name:</p>
                  <p className="">{newUser.lastName}</p>
                </div>
                <div className="mt-2">
                  <p className="font-bold text-md">Profile Picture</p>
                  <img
                    src={newUser.profilePicture}
                    alt="profile"
                    className="mt-2 rounded-xl max-h-80"
                  />
                </div>

                <button
                  type="button"
                  className="mt-2 text-white bg-main hover:bg-pink-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  onClick={(e) => handelSubmit(e)}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </form>
        {!showUploadImage && (
          <div className="mt-2 text-xs font-thin">
            if you already have an account,please{" "}
            <Link
              to="/auth/login"
              className="font-semiBold text-blue-500 underline-offset-1 text-lg"
            >
              sing in
            </Link>
          </div>
        )}
      </div>
      <div className=" mt-16 rounded-lg p-8  max-w-xl col-span-1">
        <Illustration style={{ height: "80%" }} />
      </div>

      {alert.show && (
        <span className="absolute top-1/2 left-0 right-0">
          <Alert msg={alert.msg} show={setALert} />
        </span>
      )}
    </section>
  );
};

// upload image component
const UploadProfilePic = ({ setNewUser }) => {
  // states
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState({
    isUploading: false,
    progress: 0,
  });

  const handelChange = (e) => {
    //
    setImageFile(e.target.files[0]);
    //console.log(imageFile);
  };
  const handelUpload = () => {
    //
    setUploadingImage({
      isUploading: true,
      progress: 0,
    });
    const databaseRef = ref(
      database,
      "images/" + `${Date.now()}-${imageFile.name}`
    );

    const uploadTask = uploadBytesResumable(databaseRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingImage((prevState) => {
          return {
            ...prevState,
            progress: progress * 100,
          };
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //uploaded successfully
          // getting image link
          setNewUser((prevUser) => {
            return {
              ...prevUser,
              profilePicture: downloadURL,
            };
          });

          //
        });
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-center col-span-3">
        <label
          htmlFor="profilePricture"
          className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:border-gray-600 shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
        >
          {imageFile === null ? (
            <>
              <div className="flex flex-col items-center justify-center ">
                <UploadIcon style={{ width: "35px", height: "35px" }} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input
                id="profilePricture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handelChange(e)}
                required
              />
            </>
          ) : (
            <>
              <p className="font-bold mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
                {imageFile.name}
              </p>
              <UploadIcon style={{ width: "35px", height: "35px" }} />
              {!uploadingImage.isUploading ? (
                <>
                  <p className="mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
                    change picture
                  </p>
                  <input
                    id="profilePricture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handelChange(e)}
                    required
                  />
                </>
              ) : (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-800 mt-2">
                  <div
                    className="bg-main text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition ease-in-out duration-500 "
                    style={{ width: uploadingImage.progress + "%" }}
                  >
                    {parseInt(uploadingImage.progress)}%
                  </div>
                </div>
              )}
            </>
          )}
        </label>
      </div>
      <button
        type="button"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handelUpload}
      >
        upload photo
      </button>
    </>
  );
};

export default Register;
