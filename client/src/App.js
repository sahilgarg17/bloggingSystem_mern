import "./App.css";
import AddBlog from "./components/AddBlog";
import Navbar from "./components/Navbar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Navbar />

      <Link to="/Addblog">
        <AddCircleIcon sx={{ fontSize: 60, float: "right", m: 3 }} color="primary" />

      </Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/addblog">
          <AddBlog />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
