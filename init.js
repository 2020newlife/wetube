import app from './app';

const PORT = 5000;
const handleListening = () =>
  console.log(`Example app listening on port ${PORT}!`);

app.listen(PORT, handleListening);
