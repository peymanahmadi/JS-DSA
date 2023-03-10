import { createServer } from 'http';

const hostName = '127.0.0.1';
const port = 3000;

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

app.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});
