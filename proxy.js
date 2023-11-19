const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use((req, res, next) => {
  const host = req.headers.host;
  const path = req.path;

  if (host === 'owasp-guidelines-good.com') {
    if (path.startsWith("/good-example")) {
      return proxy('owasp-guidelines-good.com:8080', {
        proxyReqPathResolver: (req) => req.url,
      })(req, res, next);
    }
    return proxy('127.0.0.1:4201', {
      proxyReqPathResolver: (req) => req.url,
    })(req, res, next);
  } else if (host === 'owasp-guidelines-bad.com') {
    if (path.startsWith("/bad-example")) {
      return proxy('owasp-guidelines-bad.com:8081', {
        proxyReqPathResolver: (req) => req.url,
      })(req, res, next);
    }
    return proxy('127.0.0.1:4200', {
      proxyReqPathResolver: (req) => req.url,
    })(req, res, next);
  }

  res.status(404).send('Not Found');
});


const PORT = 80;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});