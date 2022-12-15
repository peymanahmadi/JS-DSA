import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import EventEmitter from 'events';
const chatEmitter = EventEmitter();
chatEmitter.on('message', console.log);

const app = express();

const port = process.env.PORT || 1337;

const respondText = (req, res) => {
  res.send('hi');
};

const respondJSON = (req, res) => {
  res.json({ text: 'hi', numbers: [1, 2, 3] });
};

const respondEcho = (req, res) => {
  const { input } = req.query;
  console.log(req.query);
  console.log(req.params);
  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split('').reverse().join(''),
  });
};

const respondStatic = (req, res) => {
  console.log(req.params);
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fileName = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(fileName)
    .on('error', () => respondNotFound(req, res))
    .pipe(res);
};

const respondChat = (req, res) => {
  const { message } = req.query;
  chatEmitter.emit('message', message);
  res.end();
};

const respondNotFound = (req, res) => {
  res.send('Not Found');
};

app.get('/', respondText);
app.get('/json', respondJSON);
app.get('/echo', respondEcho);
app.get('/static/*', respondStatic);
app.get('/chat', respondChat);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
