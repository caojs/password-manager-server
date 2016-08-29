import { GRAPHQL } from '../actionCreators/constants';

function standardBody(payload) {
  return typeof payload === 'string' ?
    { query: payload } :
    payload;
}

export default ({ dispatch }) => (next) => (action) => {
  const {
    type,
    payload,
    meta
  } = action;

  if (type !== GRAPHQL) {
    return next(action);
  }

  if (process.env.NODE_ENV === 'development') {
    if (!meta) {
      throw new Error(`${GRAPHQL} action type must have meta.`);
    }
  }


  dispatch({
    type: meta,
    payload: fetch(`http://localhost:3000/graphql`, {
        method: 'POST',
        body: JSON.stringify(standardBody(payload)),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(json => {
        if (json.errors) { throw json.errors; }
        return json.data;
      })
  });
};
