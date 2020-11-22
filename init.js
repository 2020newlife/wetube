import './db';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
import './models/Video';
import './models/Comment';

const PORT = process.env.PORT || 5000;
const handleListening = () =>
  console.log(`http://127.0.0.1:${PORT} 경로로 서버 시작!`);

app.listen(PORT, handleListening);
