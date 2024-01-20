import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, User_AVTAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const password = useRef(null);
  const email = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };
  function handleSubmit() {
    const message = checkValidData(password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: User_AVTAR,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });
          // ...
        })
        .catch((error) => {
          setErrorMessage(error.message);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // ...
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className="h-screen object-cover w-screen"
          alt="bg-img"
          src={BG_IMAGE}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-9/12 md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 mt-[50%] md:mt-[10%] text-white bg-opacity-80 "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Ful Name"
            className="p-4 my-2 w-full  bg-gray-700 rounded-lg "
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="email Address"
          required={true}
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          required={true}
          placeholder="password"
          className="p-4 my-2 w-full  bg-gray-700 rounded-lg "
        />
        <p className="text-red-500">{errorMessage}</p>
        <input
          type="submit"
          className="p-4 my-6 bg-red-700 w-full"
          onClick={handleSubmit}
        />
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
