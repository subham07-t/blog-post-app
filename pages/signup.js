import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Link from "next/link";
import InputPass from "../components/InputPass";
import { useAuth } from "../context/AuthContext";
import AlertBox from "../components/AlertBox";

const Signup = () => {
  const {
    user,
    signup,
    handleMessage,
    errMsg,
    alertActivate,
    setAlertActivate,
    successAlert,
    setSuccessAlert,
  } = useAuth();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleFnameChange = (e) => {
    setFName(e.target.value);
  };
  const handleLnameChange = (e) => {
    setLName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setSignUpEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfPassChange = (e) => {
    setConfPassword(e.target.value);
  };

  const handleSignup = async () => {
    if (fName == "" || lName == "") {
      setAlertActivate(true);
      handleMessage("input field should not empty");
      setTimeout(() => {
        setAlertActivate(false);
      }, 3000);
    } else if (signUpEmail == "") {
      setAlertActivate(true);
      handleMessage("email field should not empty");
      setTimeout(() => {
        setAlertActivate(false);
      }, 3000);
    } else if (password == "" || confPassword == "") {
      setAlertActivate(true);
      handleMessage("password/confirm password field should not empty");
      setTimeout(() => {
        setAlertActivate(false);
      }, 3000);
    } else if (password !== "" && confPassword !== "") {
      if (password.length < 6) {
        setAlertActivate(true);
        handleMessage("password length should not less than 6");
        setTimeout(() => {
          setAlertActivate(false);
        }, 3000);
      } else {
        if (password == confPassword) {
          try {
            await signup(signUpEmail, password);
            setAlertActivate(false);
            setSuccessAlert(true);
            handleMessage("Account created.Please go to the login page");
            setFName("");
            setLName("");
            setSignUpEmail("");
            setPassword("");
            setConfPassword("");
            setTimeout(() => {
              setSuccessAlert(false);
            }, 3000);
          } catch (e) {
            let err = e.code.split("auth/")[1];
            handleMessage(err);
            setAlertActivate(true);
            setTimeout(() => {
              setAlertActivate(false);
            }, 3000);
          }
        } else {
          setAlertActivate(true);
          handleMessage("password & confirm password didn't match");
          setTimeout(() => {
            setAlertActivate(false);
          }, 3000);
        }
      }
    }
  };

  return (
    <>
      <div className=" mt-20 flex flex-col justify-center items-center">
        <header>
          <h1 className="font-medium text-3xl">Sign Up</h1>
        </header>
        {alertActivate && (
          <AlertBox
            bgcolor="rgb(255, 196, 196)"
            color="rgb(122, 46, 46)"
            message={errMsg}
          />
        )}
        {successAlert && (
          <AlertBox bgcolor="#d4edda" color="#23903c" message={errMsg} />
        )}
        <div className="xl:w-1/4 p-8 flex flex-col gap-6  ">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="First Name"
              type="text"
              required
              handleChange={handleFnameChange}
              value={fName}
            />
            <Input
              placeholder="Last Name"
              type="text"
              required
              handleChange={handleLnameChange}
              value={lName}
            />
            <Input
              placeholder="Email"
              type="email"
              required
              handleChange={handleEmailChange}
              value={signUpEmail}
            />
            <InputPass
              placeholder="Password"
              required
              handleChange={handlePasswordChange}
              value={password}
            />
            <InputPass
              placeholder="Confirm password"
              required
              handleChange={handleConfPassChange}
              value={confPassword}
            />
          </div>

          <button
            className="w-full bg-blue-700 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p className="text-center">
            Allready have an account?
            <Link href="login" className="underline text-blue-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
