import React, { useEffect, useState } from "react";
import { getCurrentUser, isLoggedIn } from "../auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();


  const [user, setUser] = useState("");

  useEffect(() => {
    console.log("isloggein :: ", isLoggedIn());

    if (!isLoggedIn()) {
      navigate("/");
    } else {
      setUser(getCurrentUser());
    }
  }, [navigate]);
  return (
    <>
      <h3>
        <span>{user}</span>Welcome to home page !!
      </h3>
    </>
  );
};

export default Home;
