import axios from "axios";

import { API_URL } from "./constants";

export async function getRecipes(category, ingredients) {
  // original url
  let url = API_URL + "recipes";

  // filter added url
  const queryParams = {};

  // category filter
  if (category !== "All") {
    queryParams.category = category;
  }

  // ingredients filter
  if (ingredients !== null) {
  queryParams.ingredients = ingredients;
  }

  const queryString = new URLSearchParams(queryParams).toString();

  // add filter to the original url
  if (queryString) {
    url += "?" + queryString;
  }
  const response = await axios.get(url);
  return response.data;
}

export async function getRecipe(id) {
  const response = await axios.get(API_URL + "recipes/" + id);
  // GET http://localhost:5173/recipes/68a56c48bebcbb0886111807
  return response.data;
}

export async function addRecipe(
  name,
  instruction,
  category,
  ingredients,
  image,
  token
) {
  const response = await axios.post(
    API_URL + "recipes",
    {
      name,
      instruction,
      category,
      ingredients,
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        // Bearer k2i30912k3o...
      },
    }
  );
  return response.data;
}

export async function updateRecipe(
  id,
  name,
  instruction,
  category,
  ingredients,
  image,
  token
) {
  // PUT http://localhost:5173/recipes/68a56c48bebcbb0886111807
  const response = await axios.put(
    API_URL + "recipes/" + id,
    {
      name,
      instruction,
      category,
      ingredients,
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        // Bearer k2i30912k3o...
      },
    }
  );
  return response.data;
}

export async function deleteRecipe(id, token) {
  // DELETE http://localhost:5173/recipes/68a56c48bebcbb0886111807
  const response = await axios.delete(API_URL + "recipes/" + id, {
    headers: {
      Authorization: "Bearer " + token,
      // Bearer k2i30912k3o...
    },
  });
  return response.data;
}
