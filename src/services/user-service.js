import api from "./axiosService";

export const registerUser = async (request) => {
  const response = await api.post(`/auth/register-user`, request, {
    requireAuth: false,
  });
  return response;
};

export const loginUser = async (request) => {
  const response = await api.post(`/auth/login`, request, {
    requireAuth: false,
  });
  return response;
};
