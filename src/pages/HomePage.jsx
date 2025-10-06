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

export default function HomePage() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  const [category, setCategory] = useState("all");
  // to store data from /ingredients
  const [ingredients, setIngredients] = useState([]);

  // get all ingredients
  useEffect(() => {
    getIngredients(category).then((data) => {
      setIngredients(data);
    });
  }, [category]);

  return (
    <>
      <Box sx={{ mx: "50px" }}>
        <Header />
      </Box>
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
                border: 2,
                borderColor: "black",
              }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Fruits
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
                border: 2,
                borderColor: "black",
              }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Meats
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
                border: 2,
                borderColor: "black",
              }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Seafoods
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
                border: 2,
                borderColor: "black",
              }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Seafoods
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
                border: 2,
                borderColor: "black",
              }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Seafoods
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
                border: 2,
                borderColor: "black",
              }}
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
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Fruits
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
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Meats
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
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Seafoods
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
