import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { addIngredient } from "../utils/api_ingredients";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { useCookies } from "react-cookie";

export default function IngredientAdd() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!name || !category || !image) {
      toast.error("Please fill up the required fields");
      return;
    }

    try {
      // 2. trigger the API to create new product
      await addIngredient(name, category, image, token);
      // 3. if successful, redirect user back to home page and show success message
      toast.success("New ingredient has been added");
      navigate("/ingredients");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "85vh" }}>
        <Box
          sx={{
            height: "85vh",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <Paper variant="outlined" sx={{ p: 2, py: 4 }}>
              <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Add New Ingredient
              </Typography>
              <Box mb={2}>
                <TextField
                  label="Name"
                  color="#000000"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <FormControl sx={{ width: "100%" }} color="#000000">
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ bgcolor: "white", pr: "5px" }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    {[
                      "Fruit",
                      "Meat",
                      "Seafood",
                      "Vegetable",
                      "Dairy Product",
                      "Carb & Grain",
                    ].map((cat) => (
                      <MenuItem value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                mb={2}
                sx={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                {image ? (
                  <>
                    <img src={API_URL + image} width="100px" />
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={() => setImage(null)}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    color="warning"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={async (event) => {
                        const data = await uploadImage(event.target.files[0]);
                        // { image_url: "uploads/image.jpg" }
                        // set the image url into state
                        setImage(data.image_url);
                      }}
                      accept="image/*"
                    />
                  </Button>
                )}
              </Box>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}
