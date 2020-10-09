import express from "express";
const app = express();
const PORT = 4000;

const handleListening = () => console.log(`Example app listening on port ${PORT}!`);
const handleHome = (req, res) => res.send('홈 화면입니다.');
const handleProfile = (req, res) => res.send('프로필 화면입니다.');

app.get('/', handleHome);
app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
