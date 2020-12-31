import './db';
import dotenv from 'dotenv';
import app from './app';
import './models/Video';
import './models/Comment';
import './models/User';

dotenv.config();

const PORT = process.env.PORT || 5000;
const handleListening = () =>
  console.log(`http://127.0.0.1:${PORT} 경로로 서버 시작!`);

app.listen(PORT, handleListening);
