import { Link } from "react-router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import fruit from "../assets/fruit.png";
import meat from "../assets/meat.png";
import seafood from "../assets/seafood.png";
import vege from "../assets/vege.png";
import dairy from "../assets/dairy.png";
import more from "../assets/more.png";
import breakfast from "../assets/breakfast.png";
import mainCourse from "../assets/main course.png";
import dessert from "../assets/dessert.png";
import moreFood from "../assets/moreFood.png";
import bannerWaste from "../assets/bannerWaste.png";
import bannerDiwali from "../assets/bannerDiwali.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
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
      <Box sx={{ mx: { xs: "10px", sm: "50px" } }}>
        <Typography variant="h4" sx={{ mt: 5 }} className="title">
          INGREDIENTS
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            overflow: "hidden",
            gap: 2,
            px: { xs: 2, md: 6 },
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={fruit}
                  sx={{
                    width: { xs: 150, sm: 170 },
                    height: { xs: 100, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleIngredientsNav("Fruit")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  Fruit
                </Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
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
                    width: { xs: 150, sm: 170 },
                    height: { xs: 100, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleIngredientsNav("Meat")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  Meat
                </Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
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
                    width: { xs: 150, sm: 170 },
                    height: { xs: 100, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleIngredientsNav("Seafood")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  Seafood
                </Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={vege}
                  sx={{
                    width: { xs: 150, sm: 170 },
                    height: { xs: 100, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleIngredientsNav("Vegetable")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  Vegetable
                </Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={dairy}
                  sx={{
                    width: { xs: 150, sm: 170 },
                    height: { xs: 100, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleIngredientsNav("Dairy Product")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  Dairy Product
                </Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
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
                    width: { xs: 150, sm: 170 },
                    height: { xs: 100, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleIngredientsNav("All")}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    textDecoration: "underline",
                    textDecorationColor: "#FF8C42",
                  }}
                >
                  More
                </Typography>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        <Typography variant="h4" sx={{ pt: 3 }}>
          RECIPES
        </Typography>
        {/* <Grid container spacing={1} sx={{ m: 4 }}> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            overflow: "hidden",
            gap: 2,
            px: { xs: 2, md: 6 },
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
              <Box
                size={{ xs: 6, md: 4, lg: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  className="nav"
                  component="img"
                  src={breakfast}
                  sx={{
                    width: 250,
                    height: 300,
                    borderRadius: 1,
                  }}
                  onClick={() => handleRecipesNav("Breakfast")}
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
                size={{ xs: 6, md: 4, lg: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  className="nav"
                  component="img"
                  src={mainCourse}
                  sx={{
                    width: 250,
                    height: 300,
                    borderRadius: 1,
                  }}
                  onClick={() => handleRecipesNav("Main Course")}
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
                size={{ xs: 6, md: 4, lg: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  className="nav"
                  component="img"
                  src={dessert}
                  sx={{
                    width: 250,
                    height: 300,
                    borderRadius: 1,
                  }}
                  onClick={() => handleRecipesNav("Dessert")}
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide style={{ width: "auto" }}>
              <Box
                size={{ xs: 6, md: 4, lg: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  className="nav"
                  component="img"
                  src={moreFood}
                  sx={{
                    width: 250,
                    height: 300,
                    borderRadius: 1,
                  }}
                  onClick={() => handleRecipesNav("All")}
                />
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        {/* </Grid> */}
      </Box>
    </>
  );
}
