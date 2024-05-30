import express from 'express';

const app = express();

app.listen(30401, () => {
  console.log('Server is listening on 30401');
});

// app.get('/', (req, res) => {
//   console.log('HELLO');
//   res.statusCode(200).send('HELLO');
// });
