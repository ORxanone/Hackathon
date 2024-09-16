import { BASE_URL } from "./constants";
import axios from "axios";

export const register = async (body) => {
  const url = `${BASE_URL}/register`;
  return axios.post(url, body);
};

export const login = async (body) => {
  const url = `${BASE_URL}/login`;
  return axios.post(url, body);
};

export const createBoard = async (title) => {
  const token = localStorage.getItem("authToken");

  const url = `${BASE_URL}/boards`;

  return await axios.post(
    url,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getBoards = async () => {
  const token = localStorage.getItem("authToken");

  const url = `${BASE_URL}/boards`;

  console.log("token", token);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "content-type": "application/json; charset=utf-8",
    },
  });
};

export const deleteBoard = async (id) => {
  const url = `${BASE_URL}/boards/${id}`;
  return axios.delete(url);
};
