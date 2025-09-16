export const apiClient = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`http://localhost:5000/api${url}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${JSON.stringify(result)}`);
  }

  return result;
};
