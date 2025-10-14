import Box from "@mui/material/Box";

const RecipesNav = (props) => {
  const { image, onRecipesNav, category } = props;
  return (
    <>
      <Box
        size={{ xs: 6, md: 4, lg: 3 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* recipe image */}
        <Box
          className="nav"
          component="img"
          src={image}
          sx={{
            width: 250,
            height: 300,
            borderRadius: 1,
          }}
          onClick={() => onRecipesNav(category)}
        />
      </Box>
    </>
  );
};

export default RecipesNav;
