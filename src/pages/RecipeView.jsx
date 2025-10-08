import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { getRecipe, updateRecipe } from "../utils/api_recipes";
import { getCategories } from "../utils/api_category";
import { getIngredients } from "../utils/api_ingredients";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { useCookies } from "react-cookie";

export default function RecipeView() {
  const navigate = useNavigate();
  const { id } = useParams(); // retrieve the id from the url
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    getIngredients("All").then((data) => setIngredients(data));
  }, [category]);

  // load the recipe data from the backend API, and assign it the state
  useEffect(() => {
    getRecipe(id)
      .then((recipeData) => {
        // check if recipeData is empty or not
        if (recipeData) {
          // update the state with the recipeData
          setName(recipeData ? recipeData.name : "");
          setInstruction(recipeData ? recipeData.instruction : "");
          setCategory(recipeData ? recipeData.category : "");
          setIngredient(recipeData ? recipeData.ingredients : []);
          setImage(recipeData ? recipeData.image : null);
        } else {
          // if not availabke, set error message
          setError("Recipe not found");
        }
      })
      .catch((error) => {
        // catch the API error
        setError("Recipe not found");
      });
  }, [id]);

  const match = categories.find((cat) => cat._id === category);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // if error, return the error
  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" align="center" mb={2} color="error">
            {error}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go back to home
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Box sx={{ mx: "50px" }}>
        <Header />
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" align="center" my={1}>
                {name}
              </Typography>
              {match && <Chip label={match.name} />}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                my: 4,
              }}
            >
              <Box
                component="img"
                src={API_URL + image}
                sx={{
                  width: 300,
                  height: 200,
                  borderRadius: "10%",
                  border: 2,
                  borderColor: "black",
                }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{
                  textAlign: "start",
                  pr: "50px",
                }}
              >
                Ingredients: <br />{" "}
                {ingredient.map((ing, index) => (
                  <Typography key={index}>
                    {index + 1}. {ing.name}
                  </Typography>
                ))}
              </Typography>
            </Box>
            <Typography variant="h6" align="center" sx={{ textAlign: "start" }}>
              Instruction:
            </Typography>
            <Box align="center" sx={{ textAlign: "start" }}>
              {instruction
                // split at the numbers eg. 1. 2.
                .split(/\d+\.\s*/)
                // remove empty string at the start
                .filter((i) => i.trim())
                // show each step with number
                .map((i, index) => (
                  <Typography key={i}>
                    {index + 1}. {i}
                  </Typography>
                ))}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
