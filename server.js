import http from 'http';
import querystring from 'querystring';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 1337;

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondText(req, res);
  if (req.url === '/json') return respondJSON(req, res);
  if (req.url.match(/^\/echo/)) return respondEcho(req, res);
  if (req.url.match(/^\/static/)) return respondStatic(req, res);

  respondNotFound(req, res);
});

const respondText = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
};

const respondEcho = (req, res) => {
  const { input } = querystring.parse(req.url.split('?').slice(1).join(''));
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      characterCount: input.length,
      backwards: input.split('').reverse().join(''),
    })
  );
};

const respondJSON = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
};

const respondStatic = (req, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fileName = `${__dirname}/public${req.url.split('/static')[1]}`;
  fs.createReadStream(fileName)
    .on('error', () => respondNotFound(req, res))
    .pipe(res);
};

const respondNotFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
};

server.listen(port);
console.log(`Server listening on port ${port}`);
