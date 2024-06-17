import express from 'express';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  const pathIndex = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(pathIndex);
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500)
    .redirect('/pages/error/');
});

app.listen(3000, () => {
  console.log('Server is running...');
});
