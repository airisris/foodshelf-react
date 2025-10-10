import { Link } from "react-router";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

const Header = (props) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Box
          position="static"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "50px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={Link} to="/" sx={{ marginRight: "10px" }}>
              <img src={logo} width="100" />
            </Box>
            <Box>
              {currentuser && (
                <Typography variant="body1" align="center">
                  Welcome, {currentuser.name}
                </Typography>
              )}
              {currentuser ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    // remove cookie
                    removeCookie("currentuser");
                    // redirect back to home page
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button component={Link} to="/login">
                    Login
                  </Button>
                  <Button component={Link} to="/signup">
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              typography: "body1",
              "& > :not(style) ~ :not(style)": {
                ml: 2,
              },
            }}
          >
            <MuiLink
              href="/recipes"
              sx={{ marginRight: "8px" }}
              underline="hover"
            >
              {"Recipes"}
            </MuiLink>
            <MuiLink
              href="/ingredients"
              sx={{ marginRight: "8px" }}
              underline="hover"
            >
              {"Ingredients"}
            </MuiLink>
            <MuiLink
              href="/supplies"
              sx={{ marginRight: "8px" }}
              underline="hover"
            >
              {"Supplies"}
            </MuiLink>
            {currentuser && currentuser.role === "admin" ? (
              <MuiLink
                href="/categories"
                sx={{ marginRight: "8px" }}
                underline="hover"
              >
                {"Categories"}
              </MuiLink>
            ) : null}
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
