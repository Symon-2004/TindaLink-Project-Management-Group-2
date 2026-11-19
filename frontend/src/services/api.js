// Replace 8080 and 8081 with the exact ports printed in your Gradle terminals
export const TINDALINK_API = 'http://localhost:8080/api';
export const TRANSACTION_API = 'http://localhost:8081/api';

export const apiRequest = async (baseUrl, endpoint, options = {}) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }

  return response.json();
};