import express from 'express';

const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.status(404)
    .redirect('/pages/notfound/');
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500)
    .redirect('/pages/error/');
});

app.listen(3000, () => {
  console.log('Server is running...');
});
