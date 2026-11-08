import React, { useState } from "react";

import { ReactComponent as UploadIcon } from "../../assets/upload.svg";

import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

// firebase imports
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { database } from "../../Config/firebaseConfig";
import { register } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/user.action";
import { AuthShell, AuthToast, PasswordField, TextField } from "./AuthShell";

// initail states
const initialState = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  profilePicture: "",
};

const STEPS = ["Details", "Photo", "Confirm"];

const Stepper = ({ current }) => (
  <ol className="mb-6 flex items-center gap-2" aria-label="Progress">
    {STEPS.map((label, i) => (
      <li
        key={label}
        className="flex flex-1 items-center gap-2"
        aria-current={i === current ? "step" : undefined}
      >
        <span
          className={
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
            (i <= current
              ? "bg-brand text-white"
              : "bg-surface-sunken text-muted")
          }
        >
          {i + 1}
        </span>
        <span
          className={
            "hidden text-xs font-medium sm:inline " +
            (i === current ? "text-ink" : "text-muted")
          }
        >
          {label}
        </span>
        {i < STEPS.length - 1 && (
          <span
            className={
              "h-px flex-1 " + (i < current ? "bg-brand" : "bg-line")
            }
          />
        )}
      </li>
    ))}
  </ol>
);

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
  const dsipatch = useDispatch();

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

  const step = !showUploadImage ? 0 : newUser.profilePicture === "" ? 1 : 2;

  return (
    <AuthShell
      wide
      title="Create your account"
      subtitle="Join the community in three quick steps."
      footer={
        !showUploadImage && (
          <>
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-brand hover:underline"
            >
              Sign in
            </Link>
          </>
        )
      }
    >
      <Stepper current={step} />

      <form
        className="space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 0) handelNext();
        }}
      >
        {step === 0 && (
          <>
            <TextField
              id="username"
              name="username"
              label="Username"
              autoComplete="username"
              placeholder="username here"
              value={newUser.username}
              onChange={handelChange}
              required
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="firstName"
                name="firstName"
                label="First name"
                autoComplete="given-name"
                value={newUser.firstName}
                onChange={handelChange}
                required
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                value={newUser.lastName}
                onChange={handelChange}
                required
              />
            </div>
            <PasswordField
              id="password"
              name="password"
              label="Password"
              autoComplete="new-password"
              value={newUser.password}
              onChange={handelChange}
              required
            />
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              autoComplete="new-password"
              invalid={
                newUser.confirmPassword !== "" &&
                newUser.confirmPassword !== newUser.password
              }
              value={newUser.confirmPassword}
              onChange={handelChange}
              required
            />
            <button type="submit" className="btn-primary w-full">
              Next
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <UploadProfilePic setNewUser={setNewUser} />
            <button
              type="button"
              className="btn-ghost w-full"
              onClick={() => setUploadImage(false)}
            >
              Back
            </button>
          </>
        )}

        {step === 2 && (
          <div>
            <dl className="divide-y divide-line rounded-xl border border-line text-sm">
              {[
                ["Username", newUser.username],
                ["First name", newUser.firstName],
                ["Last name", newUser.lastName],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <img
              src={newUser.profilePicture}
              alt="Your profile"
              className="mx-auto mt-4 h-28 w-28 rounded-full object-cover shadow-card"
            />
            <button
              type="button"
              className="btn-primary mt-6 w-full"
              onClick={(e) => handelSubmit(e)}
            >
              Create account
            </button>
          </div>
        )}
      </form>

      {alert.show && (
        <AuthToast>
          <Alert msg={alert.msg} show={setALert} />
        </AuthToast>
      )}
    </AuthShell>
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
      <label
        htmlFor="profilePricture"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface-sunken px-4 py-8 text-center transition-colors hover:border-brand"
      >
        <UploadIcon style={{ width: "35px", height: "35px" }} />
        {imageFile === null ? (
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">Click to upload</span> a
            profile picture
          </p>
        ) : (
          <>
            <p className="text-sm font-semibold">{imageFile.name}</p>
            {!uploadingImage.isUploading && (
              <p className="text-xs text-muted">Click to change picture</p>
            )}
          </>
        )}
        {!uploadingImage.isUploading && (
          <input
            id="profilePricture"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handelChange(e)}
            required
          />
        )}
        {uploadingImage.isUploading && (
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500"
              style={{ width: uploadingImage.progress + "%" }}
              role="progressbar"
              aria-valuenow={parseInt(uploadingImage.progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
      </label>
      <button
        type="button"
        className="btn-primary w-full"
        onClick={handelUpload}
        disabled={imageFile === null || uploadingImage.isUploading}
      >
        {uploadingImage.isUploading
          ? `Uploading ${parseInt(uploadingImage.progress)}%`
          : "Upload photo"}
      </button>
    </>
  );
};

export default Register;
