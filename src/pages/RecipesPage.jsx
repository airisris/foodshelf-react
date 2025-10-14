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
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { API_URL } from "../utils/constants";
import { toast } from "sonner";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getRecipes, deleteRecipe } from "../utils/api_recipes";
import { getCategories } from "../utils/api_category";
import { useNavigate } from "react-router";

export default function RecipesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  // to store data from /recipes
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  // to store data from /categories
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const params = new URLSearchParams(location.search);
  // read category from url
  const categoryFromURL = params.get("category");
  // read ingredient from url
  const ingredientsFromURL = params.get("ingredients");

  // get all categories
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  // get all recipes
  useEffect(() => {
    getRecipes(categoryFromURL, ingredientsFromURL).then((data) => {
      setRecipes(data);
      setLoaded(true);
    });
  }, [categoryFromURL, ingredientsFromURL]);

  // get all recipes with "All" category
  useEffect(() => {
    getRecipes("All", []).then((data) => {
      setAllRecipes(data);
    });
  }, []);

  const handleCatNav = async (category) => {
    try {
      // navigate to ingredients page with applied category filter
      if (ingredientsFromURL) {
        navigate(
          `/recipes?category=${category}&ingredients=${ingredientsFromURL}`
        );
      } else {
        navigate(`/recipes?category=${category}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
        const updatedRecipes = await getRecipes(
          categoryFromURL,
          ingredientsFromURL
        );
        setRecipes(updatedRecipes);

        toast.success("Recipe has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="recipes" />
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "85vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            overflow: "hidden",
            gap: 2,
            px: { xs: 2, md: 6 },
            minHeight: "70px",
          }}
        >
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{
              width: "fit-content",
              padding: "10px 0",
              "--swiper-pagination-color": "#FF8C42",
            }}
          >
            <SwiperSlide style={{ width: "auto" }}>
              {/* "All" category chip */}
              <Chip
                label={"All (" + allRecipes.length + ")"}
                onClick={() => handleCatNav("All")}
                variant={categoryFromURL === "All" ? "filled" : "outlined"}
                sx={{ mr: 1 }}
              />
            </SwiperSlide>

            {categories.map((cat) => (
              <SwiperSlide style={{ width: "auto" }}>
                {/* other categories chip */}
                <Chip
                  key={cat._id}
                  label={
                    cat.name +
                    " (" +
                    allRecipes.filter((r) => r.category._id === cat._id)
                      .length +
                    ")"
                  }
                  onClick={() => handleCatNav(cat._id)}
                  variant={categoryFromURL === cat._id ? "filled" : "outlined"}
                  sx={{ mr: 1 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* if admin, show add recipe button */}
          {currentuser && currentuser.role === "admin" ? (
            <Button
              variant="contained"
              color="warning"
              component={Link}
              to="/recipes/new"
              sx={{
                minWidth: "100px",
              }}
            >
              <AddIcon sx={{ mr: 1 }} /> Recipe
            </Button>
          ) : null}
        </Box>

        <Box sx={{ mx: { xs: "10px", sm: "50px" } }}>
          <Divider />
          <Grid container spacing={1} sx={{ m: 4 }}>
            {/* if recipes is empty, show: */}
            {recipes.length === 0 ? (
              <Grid
                size={{ xs: 12 }}
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
              // if recipes is not empty, show:
              recipes.map((r) => (
                <Grid
                  key={r._id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      minHeight: 300,
                    }}
                  >
                    {/* recipe image */}
                    <CardMedia
                      sx={{ height: 200 }}
                      // image={API_URL + r.image}
                      component="img"
                      src={API_URL + r.image}
                    />
                    <CardContent>
                      {/* recipe name */}
                      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {r.name}
                      </Typography>
                      {/* recipe category */}
                      {categoryFromURL === "All" ? (
                        <Chip
                          size="small"
                          label={
                            categories.find((cat) => cat._id === r.category._id)
                              ?.name
                          }
                          sx={{ mb: 2 }}
                        />
                      ) : null}
                      {/* recipe instruction */}
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {r.instruction.split(" ").slice(0, 15).join(" ")}...
                      </Typography>
                      {/* missing ingredient alert */}
                      {ingredientsFromURL !== null
                        ? (() => {
                            // find ingredients that the user doesn't have on each recipes
                            const notMatch = r.ingredients.filter(
                              (ing) => !ingredientsFromURL?.includes(ing._id)
                            );

                            // if have, display them
                            if (notMatch.length > 0) {
                              return (
                                <Alert severity="info" sx={{ mt: 1 }}>
                                  You're missing:{" "}
                                  {notMatch.map((ing) => ing.name).join(", ")}
                                </Alert>
                              );
                            }
                          })
                          // immediately calling the function
                          ()
                        : 
                          null}
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* view recipe */}
                      <Button
                        component={Link}
                        color="warning"
                        variant="outlined"
                        to={`/recipes/${r._id}`}
                        size="small"
                      >
                        View Recipe
                      </Button>
                      {/* if admin, show: */}
                      {currentuser.role === "admin" ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {/* edit recipe */}
                          <Box
                            component={Link}
                            to={`/recipes/${r._id}/edit`}
                            variant="contained"
                            sx={{ borderRadius: 5, mx: 2 }}
                          >
                            <EditIcon fontSize="small" color="info" />
                          </Box>
                          {/* delete recipe */}
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
      </Box>
    </>
  );
}
