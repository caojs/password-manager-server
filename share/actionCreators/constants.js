import isPlainObject from 'lodash/isPlainObject';

function prefix(pre) {
  return type => pre + '::' + type;
}

function trap(o) {
  if (process.env.NODE_ENV === 'development' && Proxy) {
    return new Proxy(o, {
      get: function(target, name) {
        if (target[name]) return target[name];
        if (typeof name === 'string')
          throw new Error(`action type ${name} doesn't exist.`);
      }
    });
  }
  else return o;
}

function mirror(actions) {
  const o = {};
  const app = prefix('APP');
  return actions
    .reduce((m, name) => {
      m[name] = app(name);
      return m;
    }, Object.create(null));
}

const constants = trap(mirror([
  'ACTION_FROM_SERVER',
  'SIGNUP',
  'LOGIN',
  'ADD_ACCOUNT_LIST',
]));

// Because of some magic ,using CommonJS here.
module.exports = constants;
