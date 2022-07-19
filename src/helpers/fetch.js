const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

const fetchWithToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchWithoutToken, fetchWithToken };
