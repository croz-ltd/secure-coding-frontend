const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({ ws: true })
  .on("error", (e) => {
    console.log(e);
  });

const server = http.createServer(function(req, res) {
  const host = req.headers.host;
  const path = req.url;

  if (host === 'owasp-guidelines-good.com') {
    if (path.startsWith("/good-example")) {
      proxy.web(req, res, { target: 'http://owasp-guidelines-good.com:8080' });
    } else {
      proxy.web(req, res, { target: 'http://owasp-guidelines-good.com:4201' });
    }
  } else if (host === 'owasp-guidelines-bad.com') {
    if (path.startsWith("/bad-example")) {
      proxy.web(req, res, { target: 'http://owasp-guidelines-bad.com:8081' });
    } else if (!path.startsWith("/bad-example-stomp")) {
      proxy.web(req, res, { target: 'http://owasp-guidelines-bad.com:4200' });
    }
  } else {
    res.status(404).send('Not Found');
  }
});

server.on('upgrade', function (req, socket, head) {
  const host = req.headers.host;

  if (host === 'owasp-guidelines-good.com') {
    proxy.ws(req, socket, head, {
      target: 'ws://owasp-guidelines-good.com:8080',
      ws: true
    });
  } else {
    proxy.ws(req, socket, head, {
      target: 'ws://owasp-guidelines-bad.com:8081',
      ws: true
    });
  }
});

console.log("listening on port 80")
server.listen(80);
