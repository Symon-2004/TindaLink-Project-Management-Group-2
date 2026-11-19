import { TINDALINK_API, apiRequest } from './api';

const USERS_ENDPOINT = '/users';

export const getAllUsers = async () => {
  return apiRequest(TINDALINK_API, USERS_ENDPOINT);
};

export const getUserById = async (id) => {
  return apiRequest(TINDALINK_API, `${USERS_ENDPOINT}/${id}`);
};

export const createUser = async (userData) => {
  return apiRequest(TINDALINK_API, USERS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  return apiRequest(TINDALINK_API, `${USERS_ENDPOINT}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const toggleUserStatus = async (id) => {
  return apiRequest(TINDALINK_API, `${USERS_ENDPOINT}/${id}/status`, {
    method: 'PATCH',
  });
};

export const updateUser = async (id, userData) => {
  return apiRequest(TINDALINK_API, `${USERS_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (id) => {
  return apiRequest(TINDALINK_API, `${USERS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
};
