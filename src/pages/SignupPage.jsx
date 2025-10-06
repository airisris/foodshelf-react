import Header from "../components/Header";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator";
import Paper from "@mui/material/Paper";
import { signUp } from "../utils/api_user";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

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
      <Header current="signup" title="Create a New Account" />
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography>Name</Typography>
          <Box mb={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Typography>Email</Typography>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Typography>Password</Typography>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Typography>Confirm Password</Typography>
          <Box mb={2}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </Box>
          <Button fullWidth variant="contained" onClick={() => handleSignUp()}>
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
