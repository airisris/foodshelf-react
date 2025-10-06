import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
      {/* style a header with a box that contains left and right section. The left section is for a logo and a welcome message to the user. The right section is for the buttons to navigate to recipes, ingredients and supplies page. Please style them properly using mui */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            {/* {currentuser ? ( */}
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
            {/* // ) : ( */}
            <>
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button component={Link} to="/signup">
                Sign Up
              </Button>
            </>
            {/* // )} */}
          </Box>
        </Box>
        <Box>
          <Button component={Link} to="/recipes" sx={{ marginRight: "8px" }}>
            Recipes
          </Button>
          <Button
            component={Link}
            to="/ingredients"
            sx={{ marginRight: "8px" }}
          >
            Ingredients
          </Button>
          <Button component={Link} to="/supplies">
            Supplies
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;
