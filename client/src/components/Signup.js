import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Singnup() {
  const history = useHistory();

  const [credentials, setcredentials] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleOnClick = async (e) => {
    e.preventDefault();

    console.log(
      "you have submitted the form",
      credentials.email,
      credentials.name,
      credentials.password
    );

    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };

    const response = await fetch("http://localhost:3001/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log("json is:")
    console.log(json);

    if (json.success) {
      console.log("Successful token")
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userID", json.newUser._id);
      history.push("/");
    }
    setcredentials({ email: "", name: "", password: "" });
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <Container style={{ textAlign: "center" }}>
      <h1>Sign up</h1>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          name="name"
          onChange={onChange}
          value={credentials.name}
          label="Name"
          variant="outlined"
        />{" "}
        <br /> <br />
        <TextField
          id="outlined-basic"
          name="email"
          onChange={onChange}
          value={credentials.email}
          label="Email"
          variant="outlined"
        />
        <br /> <br />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                ></IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </FormControl>
        <br /> <br />
        <Button
          onClick={handleOnClick}
          variant="outlined"
          style={{ padding: "1rem" }}
        >
          Sign up
        </Button>
      </Box>
    </Container>
  );
}
