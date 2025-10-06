import axios from "axios";

import { API_URL } from "./constants";

export async function getSupplies(token) {
  const response = await axios.get(API_URL + "supplies", {
    headers: {
      Authorization: "Bearer " + token,
      // Bearer k2i30912k3o...
    },
  });
  return response.data;
}

export async function getSupply(id) {
  const response = await axios.get(API_URL + "supplies/" + id);
  // GET http://localhost:5173/supplies/68a56c48bebcbb0886111807
  return response.data;
}

export async function addSupply(userEmail, ingredient, token) {
  const response = await axios.post(
    API_URL + "supplies",
    {
      userEmail,
      ingredient,
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

export async function deleteSupply(userEmail, ingredient, token) {
  // DELETE http://localhost:5173/supplies/68a56c48bebcbb0886111807
  const response = await axios.delete(API_URL + "supplies", {
    data: { userEmail, ingredient },
    headers: {
      Authorization: "Bearer " + token,
      // Bearer k2i30912k3o...
    },
  });
  return response.data;
}
