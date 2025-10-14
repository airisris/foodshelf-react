import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const IngredientsNav = (props) => {
  const { image, onIngredientsNav, category } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ingredient image */}
        <Box
          component="img"
          src={image}
          sx={{
            width: { xs: 150, sm: 170 },
            height: { xs: 100, sm: 120 },
            cursor: "pointer",
          }}
          onClick={() => onIngredientsNav(category)}
        />
        {/* ingredient name */}
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            textDecoration: "underline",
            textDecorationColor: "#FF8C42",
          }}
        >
          {category}
        </Typography>
      </Box>
    </>
  );
};

export default IngredientsNav;
