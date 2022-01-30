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
import { useHistory } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const history = useHistory();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

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

    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userID", json.user._id);

      history.push("/");
    }

    setcredentials({ email: "", name: "", password: "" });
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <h1>Login</h1>

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
          variant="outlined"
          onClick={handleOnClick}
          style={{ padding: "1rem" }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
