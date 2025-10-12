import { Link } from "react-router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KitchenIcon from "@mui/icons-material/Kitchen";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { API_URL } from "../utils/constants";
import { toast } from "sonner";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  getIngredients,
  getIngredient,
  deleteIngredient,
} from "../utils/api_ingredients";
import { getRecipes } from "../utils/api_recipes";
import { getAllSupplies, addSupply, getSupplies } from "../utils/api_supplies";

export default function IngredientsPage() {
  const location = useLocation();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { email, token = "" } = currentuser;
  const [category, setCategory] = useState("All");
  const [supply, setSupply] = useState([]);
  const [recipe, setRecipe] = useState([]);
  // to store data from /ingredients
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [supplies, setSupplies] = useState([]);

  // read category from url
  useEffect(() => {
    // category=${category}
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");

    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [location.search]);

  // get all ingredients with any category
  useEffect(() => {
    getIngredients("All").then((data) => {
      setAllIngredients(data);
    });
  }, []);

  // get all ingredients
  useEffect(() => {
    getIngredients(category).then((data) => {
      setIngredients(data);
    });
  }, [category]);

  // get all supplies
  useEffect(() => {
    getSupplies(token).then((data) => {
      setSupply(data);
    });
  }, []);

  // get everyone's supplies
  useEffect(() => {
    getAllSupplies(token).then((data) => {
      setSupplies(data);
    });
  }, []);

  // get all recipes
  useEffect(() => {
    getRecipes("All", ingredients).then((data) => {
      setRecipe(data);
    });
  }, []);

  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete the ingredient?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the ingredient
      if (result.isConfirmed) {
        // delete ingredient at the backend
        await deleteIngredient(id, token);
        // get the new data from the backend
        const updatedProducts = await getIngredients(category);
        setIngredients(updatedProducts);

        toast.success("Ingredient has been deleted");
      }
    });
  };

  const handleAddSupply = async (id) => {
    try {
      const ingredient = await getIngredient(id);
      // add to supply
      await addSupply(email, ingredient, token);
      const updatedSupplies = await getSupplies(token);
      setSupply(updatedSupplies);
      const allSupplies = await getAllSupplies(token);
      setSupplies(allSupplies);
      toast.success(`"${ingredient.name}" has been added to your supply`);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(ingredients);

  return (
    <>
      <Header current="ingredients" />
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
              <Chip
                label={"All (" + allIngredients.length + ")"}
                onClick={() => {
                  setCategory("All");
                }}
                variant={category === "All" ? "filled" : "outlined"}
                sx={{ mr: 1 }}
              />
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              {[
                "Fruit",
                "Meat",
                "Seafood",
                "Vegetable",
                "Dairy Product",
                "Carb & Grain",
                "Other",
              ].map((cat) => (
                <Chip
                  key={cat}
                  label={
                    cat +
                    " (" +
                    allIngredients.filter((ing) => ing.category === cat)
                      .length +
                    ")"
                  }
                  onClick={() => {
                    setCategory(cat);
                  }}
                  variant={category === cat ? "filled" : "outlined"}
                  sx={{ mr: 1 }}
                />
              ))}
            </SwiperSlide>
          </Swiper>

          {currentuser && currentuser.role === "admin" ? (
            <Button
              variant="contained"
              color="warning"
              component={Link}
              to="/ingredients/new"
              sx={{
                minWidth: "130px",
              }}
            >
              <AddIcon sx={{ mr: 1 }} /> Ingredient
            </Button>
          ) : null}
        </Box>

        <Box sx={{ mx: { xs: "10px", sm: "50px" } }}>
          <Divider />
          <Grid container spacing={1} sx={{ m: 4 }}>
            {ingredients.length === 0 ? (
              <Grid
                size={{ xs: 12 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Alert severity="info" sx={{ px: 5 }}>
                  No Ingredients Found
                </Alert>
              </Grid>
            ) : (
              ingredients.map((i) => (
                <Grid
                  key={i._id}
                  size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card sx={{ position: "relative" }}>
                    <CardMedia
                      sx={{ width: 150, height: 150 }}
                      component="img"
                      src={API_URL + i.image}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                      }}
                    >
                      {currentuser.role === "admin" ? (
                        // .some() returns true if found at least one match
                        recipe.some((r) =>
                          r.ingredients.some((ing) => ing._id === i._id)
                        ) ||
                        supplies.some((s) =>
                          s.ingredient.some((ing) => ing._id === i._id)
                        ) ? (
                          <Chip
                            label="In-use"
                            sx={{
                              bgcolor: "white",
                              border: 1,
                              borderColor: "silver",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              component={Link}
                              to={`/ingredients/${i._id}/edit`}
                              sx={{ mr: 1 }}
                            >
                              <EditIcon
                                fontSize="small"
                                color="info"
                                disabled
                              />
                            </Box>
                            <Box
                              variant="contained"
                              onClick={() => {
                                handleProductDelete(i._id);
                              }}
                            >
                              <DeleteIcon fontSize="small" color="error" />
                            </Box>
                          </Box>
                        )
                      ) : (
                        <IconButton
                          onClick={() => {
                            handleAddSupply(i._id);
                          }}
                          sx={{
                            bgcolor: "#FF8C42",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            "&:disabled": {
                              bgcolor: "#ccc", // grey out when disabled
                            },
                            "&:hover": {
                              bgcolor: "#ff6200ff",
                            },
                          }}
                          disabled={
                            supply.find((s) =>
                              s.ingredient.find((ing) => ing._id === i._id)
                            ) || !token
                          }
                        >
                          <KitchenIcon
                            fontSize="small"
                            sx={{
                              color: "white",
                            }}
                            disabled={supply.find((s) =>
                              s.ingredient.find((ing) => ing._id === i._id)
                            )}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Card>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {i.name}
                  </Typography>
                  {category === "All" ? (
                    <Chip size="small" label={i.category} sx={{ my: 1 }} />
                  ) : null}
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
