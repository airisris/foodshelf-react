import { Link } from "react-router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";
import { toast } from "sonner";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getRecipes, deleteRecipe } from "../utils/api_recipes";
import { getCategories } from "../utils/api_category";
import { getIngredients } from "../utils/api_ingredients";

export default function RecipesPage() {
  const location = useLocation();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { email, token = "" } = currentuser;
  const [category, setCategory] = useState("All");
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  // to store data from /recipes
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  // to store data from /categories
  const [categories, setCategories] = useState([]);

  // get all categories
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  // get all ingredients
  useEffect(() => {
    getIngredients("All").then((data) => setAllIngredients(data));
  }, []);

  // read category from url
  useEffect(() => {
    // category=${category}
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");

    if (categoryFromURL && categories.length > 0) {
      const match = categories.find((cat) => cat.name === categoryFromURL);
      if (match) {
        setCategory(match._id);
      }
    } else {
      setCategory("All");
    }
  }, [location.search, categories]);

  // read ingredient from url
  useEffect(() => {
    // ingredients=${ingredient}
    const params = new URLSearchParams(location.search);
    const ingredientsFromURL = params.get("ingredients");
    if (ingredientsFromURL) {
      // returns array
      setIngredients(ingredientsFromURL.split(","));
    } else {
      setIngredients([]);
    }
  }, [location.search]);

  // get all recipes
  useEffect(() => {
    getRecipes(category, ingredients).then((data) => {
      setRecipes(data);
    });
  }, [category, ingredients]);

  // get all recipes
  useEffect(() => {
    getRecipes("All", ingredients).then((data) => {
      setAllRecipes(data);
    });
  }, [ingredients]);

  console.log("Fetching recipes:" + recipes);
  console.log("Fetching recipes with:", { category, ingredients });

  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete the recipe?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the recipe
      if (result.isConfirmed) {
        // delete recipe at the backend
        await deleteRecipe(id, token);
        // get the new data from the backend
        const updatedRecipes = await getRecipes(category, ingredients);
        setRecipes(updatedRecipes);

        toast.success("Recipe has been deleted");
      }
    });
  };

  return (
    <>
      <Box sx={{ mx: "50px" }}>
        <Header />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "200px",
          }}
        >
          <Chip
            label={"All (" + allRecipes.length + ")"}
            onClick={() => {
              setCategory("All");
            }}
            variant={category === "All" ? "filled" : "outlined"}
          />
          {categories.map((cat) => (
            <Chip
              key={cat._id}
              label={
                cat.name +
                " (" +
                allRecipes.filter((r) => r.category._id === cat._id).length +
                ")"
              }
              onClick={() => {
                setCategory(cat._id);
              }}
              variant={category === cat._id ? "filled" : "outlined"}
            />
          ))}
        </Box>

        <Grid container spacing={1} sx={{ m: 4 }}>
          <Grid
            size={{ xs: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component={Link}
              to="/recipes/new"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 150,
                height: 150,
                borderRadius: "10%",
                border: 2,
                borderColor: "black",
              }}
            >
              <AddIcon />
            </Box>
          </Grid>
          {recipes.length === 0 ? (
            <Grid
              size={{ xs: 6, md: 8, lg: 9 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Alert severity="info" sx={{ px: 5 }}>
                No Recipes Found
              </Alert>
            </Grid>
          ) : (
            recipes.map((r) => (
              <Grid
                key={r._id}
                size={{ xs: 6, md: 4, lg: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Card sx={{ maxWidth: 345, minHeight: 415 }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    // image={API_URL + r.image}
                    component="img"
                    src={API_URL + r.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {r.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {r.instruction.split(" ").slice(0, 15).join(" ")}...
                    </Typography>
                    {ingredients.length > 0
                      ? (() => {
                          // find ingredients that the user doesn't have on each recipes
                          const notMatch = r.ingredients.filter(
                            (ing) => !ingredients.includes(ing._id)
                          );

                          // if have, display them
                          if (notMatch.length > 0) {
                            return (
                              <Alert severity="info" sx={{ mt: 1 }}>
                                You don't have:{" "}
                                {notMatch.map((ing) => ing.name).join(", ")}
                              </Alert>
                            );
                          }
                        })()
                      : // immediately calling the function
                        null}
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      component={Link}
                      to={`/recipes/${r._id}`}
                      size="small"
                    >
                      View Recipe
                    </Button>
                    {currentuser.role === "admin" ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component={Link}
                          to={`/recipes/${r._id}/edit`}
                          variant="contained"
                          sx={{ borderRadius: 5, mx: 2 }}
                        >
                          <EditIcon fontSize="small" color="info" />
                        </Box>
                        <Box
                          variant="contained"
                          sx={{ borderRadius: 5 }}
                          onClick={() => {
                            handleProductDelete(r._id);
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </Box>
                      </Box>
                    ) : null}
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}
