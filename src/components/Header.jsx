import { Link } from "react-router";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";

// export default function Header() {
const Header = (props) => {
  const navigate = useNavigate();
  const { current } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  console.log(current);

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Box
          position="static"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "50px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={Link} to="/" sx={{ marginRight: "10px" }}>
              <img src={logo} width="100" />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentuser && (
                <Typography variant="body1" align="center">
                  Welcome, {currentuser.name}
                </Typography>
              )}
              {currentuser ? (
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    // remove cookie
                    removeCookie("currentuser");
                    // redirect back to home page
                    navigate("/");
                  }}
                  sx={{ mx: 2 }}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </Button>
              ) : (
                <Button component={Link} to="/login" color="warning">
                  <PersonOutlineIcon sx={{ mr: 1 }} /> Login
                </Button>
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
              sx={{
                marginRight: "8px",
                color: "black",
                textDecorationColor: "transparent",
                "&:hover": {
                  textDecorationColor: "#FF8C42",
                },
                ...(current === "recipes" && {
                  textDecorationColor: "#FF8C42",
                }),
              }}
              underline="always"
            >
              {"Recipes"}
            </MuiLink>
            <MuiLink
              href="/ingredients"
              sx={{
                marginRight: "8px",
                color: "black",
                textDecorationColor: "transparent",
                "&:hover": {
                  textDecorationColor: "#FF8C42",
                },
                ...(current === "ingredients" && {
                  textDecorationColor: "#FF8C42",
                }),
              }}
              underline="always"
            >
              {"Ingredients"}
            </MuiLink>
            <MuiLink
              href="/supplies"
              sx={{
                marginRight: "8px",
                color: "black",
                textDecorationColor: "transparent",
                "&:hover": {
                  textDecorationColor: "#FF8C42",
                },
                ...(current === "supplies" && {
                  textDecorationColor: "#FF8C42",
                }),
              }}
              underline="always"
            >
              {"Supplies"}
            </MuiLink>
            {currentuser && currentuser.role === "admin" ? (
              <MuiLink
                href="/categories"
                sx={{
                  marginRight: "8px",
                  color: "black",
                  textDecorationColor: "transparent",
                  "&:hover": {
                    textDecorationColor: "#FF8C42",
                  },
                  ...(current === "categories" && {
                    textDecorationColor: "#FF8C42",
                  }),
                }}
                underline="always"
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
