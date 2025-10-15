import { Link } from "react-router";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { getRecipe } from "../utils/api_recipes";
import { getCategories } from "../utils/api_category";
import { getIngredients } from "../utils/api_ingredients";
import { useNavigate, useParams } from "react-router";
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
  // to store data from /categories
  const [categories, setCategories] = useState([]);

  // get all categories
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

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
          // if not available, set error message
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
          <Alert align="center" severity="error">
            {error}
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
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "85vh" }}>
        <Box sx={{ mx: { xs: "10px", sm: "50px" } }}>
          <Container maxWidth="md">
            <Box sx={{ py: 1 }}>
              <Paper
                variant="outlined"
                sx={{ position: "relative", p: 4, my: 2 }}
              >
                <Box
                  onClick={() => {
                    // get url from the local storage
                    const prevURL = localStorage.getItem("prevRecipesURL");
                    navigate(prevURL);
                  }}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                  }}
                >
                  <ClearIcon color="error" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* recipe name */}
                  <Typography variant="h4" align="center" mb={1}>
                    {name}
                  </Typography>
                  {/* recipe category */}
                  {match && <Chip label={match.name} />}
                </Box>
                <Grid container spacing={1} sx={{ m: 4 }}>
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* recipe image */}
                    <Box
                      component="img"
                      src={API_URL + image}
                      sx={{
                        width: 300,
                        height: 200,
                        borderRadius: 1,
                      }}
                    />
                  </Grid>
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      {/* recipe ingredient */}
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          textDecoration: "underline",
                          textDecorationColor: "#FF8C42",
                        }}
                      >
                        Ingredients:
                      </Typography>
                      {ingredient.map((ing, index) => (
                        <Typography key={index}>
                          {index + 1}. {ing.name}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
                {/* recipe instruction */}
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    textAlign: "start",
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  Instruction:
                </Typography>
                <Box align="center" sx={{ textAlign: "start" }}>
                  {instruction
                    // split at the numbers ex: 1. 2.
                    .split(/\d+\.\s*/)
                    // remove empty string at the start
                    .filter((i) => i.trim())
                    // show each step with number
                    .map((i, index) => (
                      <Typography key={index}>
                        {index + 1}. {i}
                      </Typography>
                    ))}
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
