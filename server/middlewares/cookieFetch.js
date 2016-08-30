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
  global.fetch = kuki ?
    cookieFetch(realFetch, kuki) :
    realFetch;
  next();
}

module.exports = middleware;
