import React, { useState } from "react";
import Input from "../components/Input";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import InputPass from "../components/InputPass";
import AlertBox from "../components/AlertBox";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const {
    login,
    alertActivate,
    setAlertActivate,
    router,
    handleMessage,
    errMsg,
  } = useAuth();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleLogin = async (e) => {
    console.log(name, pass);
    if (name == "" || pass == "") {
      handleMessage("input field should not empty");
      setAlertActivate(true);
      setTimeout(() => {
        setAlertActivate(false);
      }, 3000);
    } else if (name != "" && pass != "") {
      try {
        await login(name, pass);
        router.push("/blog");
      } catch (e) {
        let err = e.code.split("auth/")[1];
        handleMessage(err);
        setAlertActivate(true);
        setTimeout(() => {
          setAlertActivate(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center mt-40 ">
        <header>
          <h1 className="font-medium text-3xl">Log In</h1>
        </header>
        {alertActivate && (
          <AlertBox
            bgcolor="rgb(255, 196, 196)"
            color="rgb(122, 46, 46)"
            message={errMsg}
          />
        )}
        <div className="xl:w-1/4 p-8 flex flex-col gap-6  ">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Username or Email"
              type="text"
              handleChange={handleNameChange}
            />
            <InputPass
              placeholder="Enter your password"
              handleChange={handlePassChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 } }} />
                }
                label={<span style={{ fontSize: "14px" }}>Remember Me</span>}
              />
            </FormGroup>
            <p className="text-blue-800 font-semibold cursor-pointer text-sm ">
              Forget Password?
            </p>
          </div>
          <button
            className="w-full bg-blue-700 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleLogin}
          >
            Log In
          </button>

          <p className="text-center">
            Don`&apos;`t have an account?
            <Link href="signup" className="underline text-blue-600">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
