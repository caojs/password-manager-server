export const post = (url, data) => {
  return fetch('http://localhost:3000' + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(res => res.json());
};

export const graphPost = (query) => {
  return post('/graphql', { query });
};
