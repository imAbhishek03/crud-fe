import { json } from "react-router-dom";

// check user loggedin or not
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");

  if (data != null) {
    return true;
  } else {
    return false;
  }
};

//for login
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// for logout
export const doLogout = () => {
  localStorage.removeItem();
};

// get current user
export const currentUser = () => {
  if (isLoggedIn) return JSON.parse(localStorage.getItem("data").username);
  else return false;
};
