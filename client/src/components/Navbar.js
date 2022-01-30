import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import UserContext from "../context/userContext";
import { Link, useHistory } from "react-router-dom";
export default function NavBar() {
  const history = useHistory();

  const context = React.useContext(UserContext);

  console.log(context);

  const { user, fetchUserData } = context;

  const userID = localStorage.getItem("userID");

  React.useEffect(() => {
    console.log(userID);
    if (localStorage.getItem("token")) {
      fetchUserData(userID);
    }
  }, [userID]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    history.push("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogger
          </Typography>

          {!localStorage.getItem("token") ? (
            <>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/login"
              >
                <Button color="inherit" sx={{ mr: 1 }}>
                  Login
                </Button>
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/signup"
              >
                <Button color="inherit" sx={{ mr: 1 }}>
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            ""
          )}

          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <Typography>Home</Typography>
          </Link>

          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Typography sx={{ minWidth: 100 }}>Contact</Typography>
            <Typography sx={{ minWidth: 100 }}>Profile</Typography>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {localStorage.getItem("token") ? (
              <div>
                <MenuItem>
                  <Avatar /> {user.name}
                </MenuItem>
              </div>
            ) : (
              ""
            )}
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            {localStorage.getItem("token") ? (
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
