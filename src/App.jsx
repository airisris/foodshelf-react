import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeAdd from "./pages/RecipeAdd";
import RecipeEdit from "./pages/RecipeEdit";
import IngredientsPage from "./pages/IngredientsPage";
import IngredientAdd from "./pages/IngredientAdd";
import IngredientEdit from "./pages/IngredientEdit";
import SuppliesPage from "./pages/SuppliesPage";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/new" element={<RecipeAdd />} />
          <Route path="/recipes/:id/edit" element={<RecipeAdd />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/ingredients/new" element={<IngredientAdd />} />
          <Route path="/ingredients/:id/edit" element={<IngredientEdit />} />
          <Route path="/supplies" element={<SuppliesPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
