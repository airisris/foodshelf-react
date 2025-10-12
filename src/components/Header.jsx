import { Link } from "react-router";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";

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
            mx: "50px",
          }}
        >
          <Grid container spacing={1}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                component={Link}
                to="/"
                sx={{ mr: "10px", order: { xs: 2, md: 1 }, ml: { xs: "20px", md: 0 } }}
              >
                <img src={logo} width="100" />
              </Box>
              {currentuser && (
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ order: { xs: 1, md: 2 } }}
                >
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
                  sx={{ mx: 2, order: { xs: 3, md: 3 } }}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </Button>
              ) : (
                <Button component={Link} to="/login" color="warning">
                  <PersonOutlineIcon sx={{ mr: 1 }} /> Login
                </Button>
              )}
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-end" },
                typography: "body1",
                "& > :not(style) ~ :not(style)": {
                  ml: 2,
                },
                mb: { xs: 3, md: 0 },
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
              {!currentuser || currentuser.role !== "admin" ? (
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
              ) : null}
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
            </Grid>
          </Grid>
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
