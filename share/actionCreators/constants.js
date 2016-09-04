const MUTATION = 'APP::MUTATION';
const QUERY = 'APP::QUERY'

const prefix = pre => type => {
  return pre + '::' + type;
};

const app = prefix('APP::');
const fetch = prefix('APP::FETCH');
const mutation = prefix('APP::MUTATION');
const query = prefix('APP::QUERY');

export const SIGNUP = fetch('SIGNUP');
export const LOGIN = fetch('LOGIN');
export const ADD_ACCOUNT_LIST = mutation('ADD_ACCOUNT_LIST');
