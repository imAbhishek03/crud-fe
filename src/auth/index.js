// Check if the user is logged in
export const isLoggedIn = () => {
  const data = localStorage.getItem("data");
  return data !== null;
};

// Perform login and store user data
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// Perform logout and remove user data
export const doLogout = () => {
  localStorage.removeItem("data");
};

// Get the current logged-in user
export const getCurrentUser = () => {
  if (isLoggedIn()) {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData ? userData.username : null;
  } else {
    return null;
  }
};

// Get the current logged-in user
export const getToken = () => {
  if (isLoggedIn()) {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData ? userData.token : null;
  } else {
    return null;
  }
};
