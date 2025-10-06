import axios from "axios";

import { API_URL } from "./constants";

export const getCategories = async () => {
  const response = await axios.get(API_URL + "categories");
  return response.data;
};

export const createCategory = async (label) => {
  const response = await axios.post(API_URL + "categories", {
    label,
  });

  return response.data;
};

export async function updateCategory(id, label) {
  const response = await axios.put(API_URL + "categories/" + id, {
    label,
  });
  return response.data;
}

export async function deleteCategory(id) {
  const response = await axios.delete(API_URL + "categories/" + id);
  return response.data;
}
