const cookie = require('cookie');
const realFetch = fetch;

function cookieFetch(fetch, cookie) {
  return (url, opts) => {
    opts = opts || {};
    return fetch(url, Object.assign(opts, {
      headers: Object.assign(opts.headers || {}, { cookie })
    }));
  };
}

function middleware(req, res, next) {
  const kuki = req.headers.cookie;
  if (kuki) {
    global.fetch = cookieFetch(realFetch, kuki);
    next();
  }
  else {
    next();
  }
}

module.exports = middleware;
