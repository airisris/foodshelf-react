import { Link } from "react-router";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
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
import SearchIcon from "@mui/icons-material/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
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
  const [search, setSearch] = useState("");
  // to store data from /supplies
  const [supplies, setSupplies] = useState([]);
  const [category, setCategory] = useState("All");
  const [allIngredients, setAllIngredients] = useState([]);

  // get all ingredients
  useEffect(() => {
    getIngredients(search, "All").then((data) => {
      setAllIngredients(data);
    });
  }, [search]);

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

  if (currentuser && currentuser.role === "admin") {
    return (
      <>
        <Header />
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
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

  return (
    <>
      <Header current="supplies" />
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "85vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Search"
            color="#000000"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: "50px",
              minWidth: { xs: "270px", sm: "400px" },
            }}
          />
          <SearchIcon sx={{ py: "20px", px: "10px" }} color="warning" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            overflow: "hidden",
            px: { xs: 2, md: 6 },
            minHeight: "50px",
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
                label={
                  "All (" + supplies.flatMap((s) => s.ingredient).length + ")"
                }
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
            </SwiperSlide>
          </Swiper>
        </Box>

        <Box sx={{ mx: { xs: "10px", sm: "50px" }, pb: 6 }}>
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
                  .filter(
                    (i) =>
                      (category === "All" || i.category === category) &&
                      // search filter
                      i.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((i) => (
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
                      {category === "All" ? (
                        <Chip size="small" label={i.category} sx={{ my: 1 }} />
                      ) : null}
                    </Grid>
                  ))
              )
            )}
          </Grid>

          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              right: { xs: 10, sm: 20 },
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              py: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(7px)",
              width: { xs: "95%", sm: "100%" },
            }}
          >
            <Typography>Filter for Recipes:</Typography>
            <Button
              variant="outlined"
              color="warning"
              sx={{ mx: { xs: 1, sm: 2 } }}
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
              color="warning"
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
                    color="#000000"
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
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  color="warning"
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
