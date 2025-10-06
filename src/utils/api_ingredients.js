import axios from "axios";

import { API_URL } from "./constants";

export async function getIngredients(category) {
  const response = await axios.get(
    API_URL +
      "ingredients" +
      (category === "All" ? "" : "?category=" + category)
  );
  return response.data;
}

export async function getIngredient(id) {
  const response = await axios.get(API_URL + "ingredients/" + id);
  // GET http://localhost:5173/ingredients/68a56c48bebcbb0886111807
  return response.data;
}

export async function addIngredient(
  name,
  category,
  image,
  token
) {
  const response = await axios.post(
    API_URL + "ingredients",
    {
      name,
      category,
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

export async function updateIngredient(
  id,
  name,
  category,
  image,
  token
) {
  // PUT http://localhost:5173/ingredients/68a56c48bebcbb0886111807
  const response = await axios.put(
    API_URL + "ingredients/" + id,
    {
      name,
      category,
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

export async function deleteIngredient(id, token) {
  // DELETE http://localhost:5173/ingredients/68a56c48bebcbb0886111807
  const response = await axios.delete(API_URL + "ingredients/" + id, {
    headers: {
      Authorization: "Bearer " + token,
      // Bearer k2i30912k3o...
    },
  });
  return response.data;
}
