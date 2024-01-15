import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import createUser from "../utils/createUser";
import signInUser from "../utils/signInUser";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const password = useRef(null);
  const email = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };
  async function handleSubmit() {
    const message = checkValidData(password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      //sign up logic
      const data = await createUser(
        email.current.value,
        password.current.value
      );
      updateProfile(auth.currentUser, {
        displayName: name.current.value,
        photoURL:
          "https://media.licdn.com/dms/image/D4D35AQEZkfxpv4dcAg/profile-framedphoto-shrink_400_400/0/1688286928350?e=1705867200&v=beta&t=cb3nuj43D-mYCkw390lK0eKKZBC6XdAnAsn6ewii160",
      })
        .then(() => {
          // Profile updated!
          // ...
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          navigate("/browse");
        })
        .catch((error) => {
          // An error occurred
          setErrorMessage(error.message);
          // ...
        });
      if (data.message === "error") {
        console.log("data " + data);
        setErrorMessage(data.errorCode);
      }
      navigate("/browse");
    } else {
      const data = await signInUser(
        email.current.value,
        password.current.value
      );

      if (data.message === "success") {
        navigate("/browse");
      }
      setErrorMessage(data.errorCode);
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          alt="bg-img"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 "
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
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          required="true"
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
