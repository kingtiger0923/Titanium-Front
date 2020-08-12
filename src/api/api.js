import axios from 'axios';

const createAxios = (token) => {
  const config = {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  };
  const instance = axios.create(config);

  return instance;
};

export const POST = (url, data, token = null) =>
  createAxios(token).post(url, data);

