import Header from "../components/Header";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator";
import Paper from "@mui/material/Paper";
import { signUp } from "../utils/api_user";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import bg from "../assets/bg.jpg";
import bg2 from "../assets/bg2.jpg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSignUp = async () => {
    // make sure the name and email fields are not empty
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
        toast.error(error.response.data.message);
      }
    }
  };

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
                <Typography>Already have an account?</Typography>
                <Link
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
                </Link>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SignupPage;
