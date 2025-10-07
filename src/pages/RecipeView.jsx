import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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

  const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!name || !instruction || !category || !ingredient || !image) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to create new recipe
      await updateRecipe(
        id,
        name,
        instruction,
        category,
        ingredient.map((i) => i._id), // send only the ids to the backend
        image,
        token
      );
      // 3. if successful, redirect user and show success message
      toast.success("Recipe has been updated");
      navigate("/recipes");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            <Typography variant="h4" align="center" my={3}>
              Recipe
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Instruction"
                multiline
                rows={4}
                fullWidth
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ bgcolor: "white", pr: "5px" }}
                >
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem value={cat._id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <Autocomplete
                multiple
                options={ingredients}
                getOptionLabel={(option) => option.name}
                value={ingredient}
                onChange={(e, newValue) => setIngredient(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ingredients"
                    placeholder="Search..."
                  />
                )}
              />
            </Box>
            <Box
              mb={2}
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              {image ? (
                <>
                  <img src={API_URL + image} width="100px" />
                  <Button
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => setImage(null)}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={async (event) => {
                      const data = await uploadImage(event.target.files[0]);
                      // { image_url: "uploads/image.jpg" }
                      // set the image url into state
                      setImage(data.image_url);
                    }}
                    accept="image/*"
                  />
                </Button>
              )}
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFormSubmit}
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
