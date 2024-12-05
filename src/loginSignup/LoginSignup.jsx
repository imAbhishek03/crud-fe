import React, { useEffect, useState } from "react";
import "../style/LoginSignup.css";
import mail_icon from "../assets/mail-icon.png";
import user_icon from "../assets/user-icon.png";
import password_icon from "../assets/password-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, registerUser } from "../services/user-service";
import { doLogin, getToken, isLoggedIn } from "../auth";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("isloggein :: ", isLoggedIn());
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // handle change

  const handleChange = (e, key) => {
    setInputs({
      ...inputs,
      [key]: e.target.value,
    });
  };

  // registering handle

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register Details ::: ", inputs);

    if (
      inputs.username.trim() == "" ||
      inputs.email.trim() == "" ||
      inputs.password.trim() == ""
    ) {
      console.log("Username,email or Password is required !!");
      toast.error("Username,email or Password is required !!");
    } else {
      // calling API

      registerUser(inputs)
        .then((response) => {
          console.log("response ::: ", response.data);
          if (response.status == 200) {
            toast("Successfully Registered !!");

            setInputs({
              username: "",
              email: "",
              password: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong !!");
        });
    }
  };

  // login handle

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login Details ::: ", inputs);

    // validations

    if (inputs.username.trim() == "" || inputs.password.trim() == "") {
      console.log("Username or Password is required !!");

      toast.error("Username or Password is required !!");
    } else {
      // calling API

      loginUser(inputs)
        .then((response) => {
          console.log("response ::: ", response);

          if (response.status == 200) {
            toast("Login Successfully !!");

            // save data to local storage
            doLogin(response.data, () => {
              console.log("login details is saved to localstorage.");
            });
            if (isLoggedIn()) {
              navigate("/dashboard");
              console.log("Token ::: ", getToken());
              
            }
          }
        })
        .catch((error) => {
          console.log(error.response);

          toast(error.response.data);
        });
    }
  };
  return (
    <section>
      <div className="login-container">
        <ToastContainer />
        <div className="toggle-container">
          <div
            className={action === "Register" ? "toggle gray" : "toggle"}
            onClick={() => {
              setAction("Login");
              setInputs({
                username: "",
                email: "",
                password: "",
              });
            }}
          >
            Login
          </div>
          <div
            className={action === "Login" ? "toggle gray" : "toggle"}
            onClick={() => {
              setAction("Register");
              setInputs({
                username: "",
                email: "",
                password: "",
              });
            }}
          >
            Register
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={(e) => handleChange(e, "username")}
              value={inputs.username}
            />
          </div>

          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={mail_icon} alt="" />
              <input
                name="email"
                type="email"
                placeholder="Email Id"
                onChange={(e) => handleChange(e, "email")}
                value={inputs.email}
              />
            </div>
          )}
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e, "password")}
              value={inputs.password}
            />
          </div>
        </div>

        <div
          className="submit"
          onClick={action === "Register" ? handleRegister : handleLogin}
        >
          {action}
        </div>

        {action === "Register" ? (
          <div></div>
        ) : (
          <div className="forgot-password-container">
            <div className="forgot-password">
              Forgot Password? <span>Click Here!</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginSignup;
