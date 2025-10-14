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
import { signUp } from "../utils/api_user";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import bg2 from "../assets/bg2.jpg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSignUp = async () => {
    // check for error
    if (!name || !email || !password || !cPassword) {
      toast.error("Please fill up all the the fields");
    } else if (!validator.validate(email)) {
      // make sure the email is valid
      toast.error("Please use a valid email address");
    } else if (password !== cPassword) {
      // check for password match
      toast.error("Password does not match");
    } else {
      // do sign up
      try {
        // create user
        const userData = await signUp(name, email, password);
        // set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // expire in 8 hours
        });
        toast.success("You have successfully signed up an account");
        navigate("/");
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }
    }
  };

  // if user already logged in, show:
  if (token) {
    return (
      <>
        <Header />
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
          {/* logged in users cannot access this page */}
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

  // if user is logged out, show:
  return (
    <>
      <Header />
      <Box
        style={{
          backgroundImage: `url(${bg2})`,
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
                Create An Account
              </Typography>
              {/* user name */}
              <Box mb={2}>
                <TextField
                  label="Name"
                  color="#000000"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              {/* user email */}
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
              {/* user password */}
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
              {/* user confirm password */}
              <Box mb={2}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  color="#000000"
                  variant="outlined"
                  fullWidth
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </Box>
              <Button
                fullWidth
                color="warning"
                variant="contained"
                onClick={() => handleSignUp()}
              >
                Sign Up
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
                {/* navigate to log in if user got an account */}
                <Typography>Already have an account?</Typography>
                <MuiLink
                  href="/login"
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
                  Log in
                </MuiLink>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SignupPage;
