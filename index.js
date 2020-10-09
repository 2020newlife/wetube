import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 4000;

const handleListening = () =>
  console.log(`Example app listening on port ${PORT}!`);
const handleHome = (req, res) => res.send('홈 화면입니다.');
const handleProfile = (req, res) => res.send('프로필 화면입니다.');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('short'));

app.get('/', handleHome);
app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
