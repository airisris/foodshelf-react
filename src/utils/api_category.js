import axios from "axios";

import { API_URL } from "./constants";

export const getCategories = async () => {
  const response = await axios.get(API_URL + "categories");
  return response.data;
};

export const createCategory = async (name) => {
  const response = await axios.post(API_URL + "categories", {
    name,
  });

  return response.data;
};

export async function updateCategory(id, name) {
  const response = await axios.put(API_URL + "categories/" + id, {
    name,
  });
  return response.data;
}

export async function deleteCategory(id) {
  const response = await axios.delete(API_URL + "categories/" + id);
  return response.data;
}
