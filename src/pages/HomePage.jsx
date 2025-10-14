import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
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
import IngredientsNav from "../components/IngredientsNav";
import RecipesNav from "../components/RecipesNav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router";
import { getCategories } from "../utils/api_category";
import { useState, useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  // to store data from /categories
  const [categories, setCategories] = useState([]);

  // get all categories
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

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
      if (category !== "All") {
        // get the id of the category
        const match = categories.find((cat) => cat.name === category)._id;
        // navigate to ingredients page with applied category filter
        navigate(`/recipes?category=${match}`);
      } else {
        // navigate to ingredients page with applied category "All" filter
        navigate(`/recipes?category=${category}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      {/* banner carousel */}
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
        <Typography variant="h4" sx={{ mt: 5 }} className="title-ing">
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
          {/* swiperjs component */}
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
            {/* fruit ingredients nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <IngredientsNav
                image={fruit}
                onIngredientsNav={handleIngredientsNav}
                category={"Fruit"}
              />
            </SwiperSlide>

            {/* meat ingredients nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <IngredientsNav
                image={meat}
                onIngredientsNav={handleIngredientsNav}
                category={"Meat"}
              />
            </SwiperSlide>

            {/* seafood ingredients nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <IngredientsNav
                image={seafood}
                onIngredientsNav={handleIngredientsNav}
                category={"Seafood"}
              />
            </SwiperSlide>

            {/* vegetable ingredients nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <IngredientsNav
                image={vege}
                onIngredientsNav={handleIngredientsNav}
                category={"Vegetable"}
              />
            </SwiperSlide>

            {/* dairy product ingredients nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <IngredientsNav
                image={dairy}
                onIngredientsNav={handleIngredientsNav}
                category={"Dairy Product"}
              />
            </SwiperSlide>

            {/* all ingredients nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <IngredientsNav
                image={more}
                onIngredientsNav={handleIngredientsNav}
                category={"All"}
              />
            </SwiperSlide>
          </Swiper>
        </Box>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }} className="title-rec">
          RECIPES
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
          {/* swiperjs component */}
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
            {/* breakfast recipes nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <RecipesNav
                image={breakfast}
                onRecipesNav={handleRecipesNav}
                category={"Breakfast"}
              />
            </SwiperSlide>

            {/* main course recipes nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <RecipesNav
                image={mainCourse}
                onRecipesNav={handleRecipesNav}
                category={"Main Course"}
              />
            </SwiperSlide>

            {/* dessert recipes nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <RecipesNav
                image={dessert}
                onRecipesNav={handleRecipesNav}
                category={"Dessert"}
              />
            </SwiperSlide>

            {/* all recipes nav */}
            <SwiperSlide style={{ width: "auto" }}>
              <RecipesNav
                image={moreFood}
                onRecipesNav={handleRecipesNav}
                category={"All"}
              />
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box>
    </>
  );
}
