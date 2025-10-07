import { Link } from "react-router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
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
import { addSupply, getSupplies } from "../utils/api_supplies";

export default function IngredientsPage() {
  const location = useLocation();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { email, token = "" } = currentuser;
  const [category, setCategory] = useState("All");
  const [supply, setSupply] = useState([]);
  // to store data from /ingredients
  const [ingredients, setIngredients] = useState([]);

  // read category from url
  useEffect(() => {
    // category=${category}
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");

    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [location.search]);

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

      // // find out if the ingredient already exists in the supply or not
      // const supplies = await getSupplies("All", token);
      // supplies.find(
      //   (s) => {
      //     console.log(s.ingredient_id);
      //     return s.ingredient === id
      //   }
      // );

      // if (selected) {
      //   // if already exists, return
      //   toast.info(
      //     `"${ingredient.name}" has already been added to your supply`
      //   );
      //   return;
      // } else {
      // if not exists, add to supply
      await addSupply(email, ingredient, token);
      const updatedSupplies = await getSupplies(token);
      console.log(updatedSupplies);
      setSupply(updatedSupplies);
      toast.success(`"${ingredient.name}" has been added to your supply`);
      // }
    } catch (error) {
      toast.error(error.message);
    }
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
          <Button
            variant="contained"
            onClick={() => {
              setCategory("All");
            }}
          >
            All
          </Button>
          {[
            "Fruit",
            "Meat",
            "Seafood",
            "Vegetable",
            "Dairy Product",
            "Carb & Grain",
          ].map((cat) => (
            <Button
              key={cat}
              variant="contained"
              onClick={() => {
                setCategory(cat);
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        <Grid container spacing={1} sx={{ m: 4 }}>
          <Grid
            size={{ xs: 6, md: 4, lg: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component={Link}
              to="/ingredients/new"
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
          {ingredients.map((i) => (
            <Grid
              key={i._id}
              size={{ xs: 6, md: 4, lg: 2 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                // image={API_URL + i.image}
                src={API_URL + i.image}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "10%",
                  border: 2,
                  borderColor: "black",
                }}
              />
              <Box>
                {/* {currentuser.role === "admin" ? ( */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    component={Link}
                    to={`/ingredients/${i._id}/edit`}
                    variant="contained"
                    sx={{ borderRadius: 5 }}
                  >
                    <EditIcon fontSize="small" color="info" />
                  </Box>
                  <Box
                    variant="contained"
                    sx={{ borderRadius: 5 }}
                    onClick={() => {
                      handleProductDelete(i._id);
                    }}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </Box>
                </Box>
                {/* ) : null} */}
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {i.name}
              </Typography>
              <Button
                variant="contained"
                disabled={supply.find((s) =>
                  s.ingredient.find((ing) => ing._id === i._id)
                )}
                onClick={() => {
                  handleAddSupply(i._id);
                }}
              >
                Add To My Supply
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
