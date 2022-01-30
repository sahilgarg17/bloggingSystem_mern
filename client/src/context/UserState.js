import UserContext from "./userContext";

import React from "react";

const UserState = (props) => {
  // fetching  user data

  const [user, setuser] = React.useState({});

  const fetchUserData = async (id) => {
    const response = await fetch(
      `http://localhost:3001/api/auth/fetchuser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    console.log(json);

    setuser(json);
  };

  return (
    <UserContext.Provider value={{ fetchUserData, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
