const MUTATION = 'APP::MUTATION';
const QUERY = 'APP::QUERY'

const prefix = pre => type => {
  return pre + '::' + type;
};

const mutation = prefix(MUTATION);
const query = prefix(QUERY);

export const FETCH = 'APP::FETCH';
export const GRAPHQL = 'APP::GRAPHQL';
export const ADD_ACCOUNT_LIST = mutation('ADD_ACCOUNT_LIST');
