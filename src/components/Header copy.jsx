import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const Header = (props) => {
  const navigate = useNavigate();
  const { current, title = "Welcome to My Store" } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mx: 7,
          py: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        {currentuser && (
          <Typography variant="body1" align="center">
            Welcome, {currentuser.name}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            mt: 2,
          }}
        >
          <Button
            component={Link}
            to="/"
            color="primary"
            variant={current === "home" ? "contained" : "outlined"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            color="primary"
            variant={current === "cart" ? "contained" : "outlined"}
          >
            Cart
          </Button>
          <Button
            component={Link}
            to="/orders"
            variant={current === "orders" ? "contained" : "outlined"}
          >
            My Orders
          </Button>
          <Button
            component={Link}
            to="/categories"
            variant={current === "categories" ? "contained" : "outlined"}
          >
            Categories
          </Button>
          {currentuser ? (
            <Button
              variant="outlined"
              onClick={() => {
                // remove cookie
                removeCookie("currentuser");
                // redirect back to home page
                navigate("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant={current === "login" ? "contained" : "outlined"}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant={current === "signup" ? "contained" : "outlined"}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;

{
  /* {ingredients.map((i) => (
            <Box
              component="img"
              src={i.image}
              width="200px"
              sx={{
                borderRadius: "100%",
                border: 1,
                borderColor: "secondary.main",
              }}
            />
          ))} */
}

const handleAddSupply = async (id) => {
    try {
      const ingredient = await getIngredient(id);
      // check if ingredient already exist
      const exist = supply.find((s) => s._id === id);
      if (exist) {
        // if already exists, return
        toast.info(
          `"${ingredient.name}" has already been added to your supply`
        );
        console.log(supply);
        return;
      }
      // if not exist, add to supply
      const userEmail = "john@gmail.com"; // placeholder
      await addSupply(userEmail, ingredient, token);
      const updatedSupplies = await getSupplies("All");
      setSupply(updatedSupplies);
      console.log(updatedSupplies);
      toast.success(`"${ingredient.name}" has been added to your supply`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  {currentuser && currentuser.role === "admin" ? (
                <Grid
                  size={{ xs: 6, md: 4, lg: 3 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card sx={{ width: 270, maxWidth: 345, minHeight: 415 }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <AddIcon />
                    </CardContent>
                  </Card>
                  {/* <Box
                    component={Link}
                    to="/recipes/new"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 270,
                      height: 415,
                      borderRadius: 1,
                      bgcolor: "white"
                    }}
                  >
                    <AddIcon />
                  </Box> */}
                </Grid>
              ) : null}