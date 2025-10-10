import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import meat from "../assets/meat.png";
import seafood from "../assets/seafood.png";
import more from "../assets/more.png";
import bannerWaste from "../assets/bannerWaste.png";
import bannerDiwali from "../assets/bannerDiwali.png";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getIngredients } from "../utils/api_ingredients";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;

  const handleIngredientsNav = async (category) => {
    try {
      // navigate to ingredients page with applied category filter
      navigate(`/ingredients?category=${category}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRecipesNav = async (category) => {
    try {
      // navigate to ingredients page with applied category filter
      navigate(`/recipes?category=${category}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <Box
            component="img"
            src={bannerWaste}
            className="embla__slide"
            sx={{ width: "100%" }}
          />
          <Box
            component="img"
            src={bannerDiwali}
            className="embla__slide"
            sx={{ width: "100%" }}
          />
        </div>
        <Box className="arrow bounce">
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </Box>
      </div>
      <Box sx={{ mx: "50px" }}>
        <Typography variant="h4">Ingredients</Typography>
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
              component="img"
              src="https://www.earthytales.in/uploads/products/3x/organic-low-cist-fruits_(1).jpg?v=1609202504"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
              onClick={() => handleIngredientsNav("Fruit")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Fruit
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={meat}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
              onClick={() => handleIngredientsNav("Meat")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Meat
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={seafood}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
              onClick={() => handleIngredientsNav("Seafood")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Seafood
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={seafood}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
              onClick={() => handleIngredientsNav("Vegetable")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vegetable
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={seafood}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
              onClick={() => handleIngredientsNav("Dairy Product")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Dairy Product
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={more}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
              onClick={() => handleIngredientsNav("All")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              More
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4">Recipes</Typography>
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
              component="img"
              src="https://www.earthytales.in/uploads/products/3x/organic-low-cist-fruits_(1).jpg?v=1609202504"
              sx={{
                width: 250,
                height: 300,
                border: 2,
                borderColor: "black",
              }}
              onClick={() => handleRecipesNav("Breakfast")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Breakfast
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={meat}
              sx={{
                width: 250,
                height: 300,
                border: 2,
                borderColor: "black",
              }}
              onClick={() => handleRecipesNav("Main Course")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Main Course
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={seafood}
              sx={{
                width: 250,
                height: 300,
                border: 2,
                borderColor: "black",
              }}
              onClick={() => handleRecipesNav("Dessert")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Dessert
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={more}
              sx={{
                width: 250,
                height: 300,
                border: 2,
                borderColor: "black",
              }}
              onClick={() => handleRecipesNav("All")}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              More
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
