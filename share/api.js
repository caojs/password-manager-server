export const post = (url, data) => {
  return fetch('http://localhost:3000' + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(res => res.json())
  .catch(err => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(err.stack);
    }
    errors: [{ message: err.message }]
  });
};

export const graphPost = (query) => {
  return post('/graphql', { query });
};
