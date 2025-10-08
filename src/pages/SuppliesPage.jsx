import { Link } from "react-router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getSupplies, deleteSupply } from "../utils/api_supplies";
import { useNavigate } from "react-router";

export default function SuppliesPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { email, token = "" } = currentuser;
  // to store data from /supplies
  const [supplies, setSupplies] = useState([]);
  const [category, setCategory] = useState("All");

  // get all supplies
  useEffect(() => {
    getSupplies(token).then((data) => {
      console.log("Supplies data:", data);
      setSupplies(data);
    });
  }, []);

  console.log("supplies state: " + supplies);

  const handleAllSuppliesNav = async (ingredient) => {
    try {
      // navigate to ingredients page with applied category filter
      console.log("ingredient" + ingredient);
      navigate(`/recipes?category=All&ingredients=${ingredient}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveSupply = async (ingredient) => {
    Swal.fire({
      title: "Are you sure you want to remove the ingredient?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      // once user confirm, then we remove the ingredient
      if (result.isConfirmed) {
        // delete supply at the backend
        await deleteSupply(email, ingredient, token);
        // get the new data from the backend
        const updatedSupply = await getSupplies(token);
        setSupplies(updatedSupply);

        toast.success("Ingredient has been removed from supply");
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
          {supplies.some((s) => s.ingredient.length === 0) ? (
            <Grid
              size={{ xs: 6, md: 8, lg: 10 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Alert severity="info" sx={{ px: 5 }}>
                No Supplies Found
              </Alert>
            </Grid>
          ) : (
            supplies.map((s) =>
              s.ingredient
                .filter((i) => category === "All" || i.category === category)
                .map((i) => (
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
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {i.name}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("Deleting ingredient:", i._id);
                        handleRemoveSupply(i._id);
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                ))
            )
          )}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Filter for Recipes:</Typography>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() =>
              handleAllSuppliesNav(
                supplies.map((s) => s.ingredient.map((ing) => ing._id))
              )
            }
          >
            All ingredients
          </Button>
          <Button variant="contained">Select ingredients</Button>
        </Box>
      </Box>
    </>
  );
}
