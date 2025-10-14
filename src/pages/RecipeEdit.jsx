import { Link } from "react-router";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { getRecipe, updateRecipe } from "../utils/api_recipes";
import { getCategories } from "../utils/api_category";
import { getIngredients } from "../utils/api_ingredients";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { useCookies } from "react-cookie";

export default function RecipeEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // retrieve the id from the url
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  const [name, setName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [image, setImage] = useState(null);
  // to store data from /categories
  const [categories, setCategories] = useState([]);
  // to store data from /ingredients
  const [ingredients, setIngredients] = useState([]);

  // get all categories
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  // get all ingredients
  useEffect(() => {
    getIngredients("", "All").then((data) => setIngredients(data));
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
          console.log("Recipe not found");
        }
      })
      .catch((error) => {
        // catch the API error
        console.log("Recipe not found");
      });
  }, [id]);

  const handleFormSubmit = async (event) => {
    // check for error
    if (!name || !instruction || !category || !ingredient || !image) {
      toast.error("Please fill up the required fields");
      return;
    }

    try {
      // trigger the API to create new recipe
      await updateRecipe(
        id,
        name,
        instruction,
        category,
        ingredient.map((i) => i._id), // send only the ids to the backend
        image,
        token
      );
      // if successful, redirect user and show success message
      toast.success("Recipe has been updated");
      navigate("/recipes?category=All");
    } catch (error) {
      console.log(error.message);
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

  // if not admin, show:
  if (!currentuser || currentuser.role !== "admin") {
    return (
      <>
        <Header />
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
          {/* only admin can access to this page */}
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

  // if admin, show:
  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "85vh" }}>
        <Box sx={{ mx: { xs: "10px", sm: "50px" } }}>
          <Container maxWidth="md">
            <Box sx={{ py: 1 }}>
              <Paper
                variant="outlined"
                sx={{ p: 2, py: 4, my: 2, position: "relative" }}
              >
                <Box
                  component={Link}
                  to="/recipes?category=All"
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                  }}
                >
                  <ClearIcon color="error" />
                </Box>
                <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                  Update Recipe
                </Typography>
                {/* update recipe name */}
                <Box mb={2}>
                  <TextField
                    label="Name"
                    color="#000000"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                {/* update recipe instruction */}
                <Box mb={2}>
                  <TextField
                    label="Instruction"
                    color="#000000"
                    multiline
                    rows={4}
                    fullWidth
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </Box>
                {/* update recipe category */}
                <Box mb={2}>
                  <FormControl sx={{ width: "100%" }} color="#000000">
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
                {/* update recipe ingredient */}
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
                        color="#000000"
                        placeholder="Search..."
                      />
                    )}
                  />
                </Box>
                {/* update recipe image */}
                <Box
                  mb={2}
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {image ? (
                    <>
                      <img src={API_URL + image} width="100px" />
                      <Button
                        color="error"
                        variant="outlined"
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
                      variant="outlined"
                      color="warning"
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
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={handleFormSubmit}
                >
                  Update
                </Button>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
