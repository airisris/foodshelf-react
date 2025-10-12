import { Link } from "react-router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Autocomplete, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getSupplies, deleteSupply } from "../utils/api_supplies";
import { getIngredients } from "../utils/api_ingredients";
import { useNavigate } from "react-router";

export default function SuppliesPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { email, token = "" } = currentuser;
  const [open, setOpen] = useState(false);
  const [supply, setSupply] = useState([]);
  // to store data from /supplies
  const [supplies, setSupplies] = useState([]);
  const [category, setCategory] = useState("All");
  const [allIngredients, setAllIngredients] = useState([]);

  // get all ingredients
  useEffect(() => {
    getIngredients("All").then((data) => {
      setAllIngredients(data);
    });
  }, []);

  // get all supplies
  useEffect(() => {
    getSupplies(token).then((data) => {
      console.log("Supplies data:", data);
      setSupplies(data);
    });
  }, []);

  const handleAllSuppliesNav = async (ingredient) => {
    try {
      // navigate to ingredients page with applied category filter
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
      <Header current="supplies" />
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "85vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "70px",
            }}
          >
            <Chip
              label={
                "All (" + supplies.flatMap((s) => s.ingredient).length + ")"
              }
              onClick={() => {
                setCategory("All");
              }}
              variant={category === "All" ? "filled" : "outlined"}
              sx={{ mr: 1 }}
            />
            {[
              "Fruit",
              "Meat",
              "Seafood",
              "Vegetable",
              "Dairy Product",
              "Carb & Grain",
            ].map((cat) => (
              <Chip
                key={cat}
                label={
                  cat +
                  " (" +
                  supplies
                    .flatMap((s) => s.ingredient)
                    .filter((ing) => ing.category === cat).length +
                  ")"
                }
                onClick={() => {
                  setCategory(cat);
                }}
                variant={category === cat ? "filled" : "outlined"}
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mx: "50px" }}>
          <Divider />
          <Grid container spacing={1} sx={{ m: 4 }}>
            {!token ? (
              <Grid
                size={{ xs: 12 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Alert severity="info" sx={{ px: 5 }}>
                  Please Login to Use This Page
                </Alert>
              </Grid>
            ) : supplies
                // returns only one big array
                .flatMap((s) =>
                  s.ingredient.filter(
                    (i) => category === "All" || i.category === category
                  )
                ).length === 0 ? (
              <Grid
                size={{ xs: 12 }}
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
                          <IconButton
                            onClick={() => {
                              console.log("Deleting ingredient:", i._id);
                              handleRemoveSupply(i._id);
                            }}
                            sx={{
                              bgcolor: "rgba(255, 0, 0, 1)",
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              "&:hover": {
                                bgcolor: "#d33",
                              },
                            }}
                          >
                            <DeleteIcon
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          </IconButton>
                        </Box>
                      </Card>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {i.name}
                      </Typography>
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
              disabled={!token}
            >
              All ingredients
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
              disabled={!token}
            >
              Select ingredients
            </Button>
          </Box>

          <Modal open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Autocomplete
                multiple
                options={supplies.flatMap((s) =>
                  s.ingredient.map((ing) => ing)
                )}
                getOptionLabel={(option) => option.name}
                value={supply}
                onChange={(e, newValue) => setSupply(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ingredients"
                    placeholder="Search..."
                  />
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  pt: 2,
                }}
              >
                {" "}
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleAllSuppliesNav(supply.map((s) => s._id))}
                >
                  Apply Filter
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
