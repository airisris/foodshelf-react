import axios from "axios";

import { API_URL } from "./constants";

export const signUp = async (name, email, password) => {
  const response = await axios.post(API_URL + "users/signup", {
    name,
    email,
    password,
  });

  return response.data;
};

export const logIn = async (email, password) => {
  const response = await axios.post(API_URL + "users/login", {
    email,
    password,
  });

  return response.data;
};
