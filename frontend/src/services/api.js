export const TINDALINK_API = 'http://localhost:8080/api';
export const TRANSACTION_API = 'http://localhost:8081/api';

export const apiRequest = async (baseUrl, endpoint, options = {}) => {
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || `HTTP Error ${response.status}`);
  }

  return data;
};
