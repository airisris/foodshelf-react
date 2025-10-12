import { Link } from "react-router";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator";
import Paper from "@mui/material/Paper";
import { logIn } from "../utils/api_user";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import bg from "../assets/bg.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // make sure the name and email fields are not empty
    if (!email || !password) {
      toast.error("Please fill up all the the fields");
    } else if (!validator.validate(email)) {
      // make sure the email is valid
      toast.error("Please use a valid email address");
    } else {
      // do sign up
      try {
        // login user
        const userData = await logIn(email, password);
        // set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // expire in 8 hours
        });
        toast.success("You have successfully logged in");
        navigate("/");
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }
    }
  };

  if (token) {
    return (
      <>
        <Header />
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
          <Alert align="center" severity="error">
            You Shall Not Pass
          </Alert>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "85vh",
        }}
      >
        <Box
          sx={{
            height: "85vh",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <Paper variant="outlined" sx={{ p: 2, py: 4 }}>
              <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Welcome Back!
              </Typography>
              <Box mb={2}>
                <TextField
                  label="Email"
                  color="#000000"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  type="password"
                  color="#000000"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Button
                fullWidth
                color="warning"
                variant="contained"
                onClick={() => handleLogin()}
              >
                Login
              </Button>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  typography: "body1",
                  "& > :not(style) ~ :not(style)": {
                    ml: 1,
                  },
                  mt: 3,
                }}
              >
                <Typography>Doesn't have an account yet?</Typography>
                <MuiLink
                  href="/signup"
                  sx={{
                    marginRight: "8px",
                    color: "#FF8C42",
                    textDecorationColor: "black",
                    "&:hover": {
                      color: "black",
                      textDecorationColor: "#FF8C42",
                    },
                  }}
                >
                  Sign up
                </MuiLink>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
