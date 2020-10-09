const express = require('express');
const app = express();
const PORT = 4000;

function handleHome(req, res){
    console.log(req);
    res.send('홈 화면입니다.')
}
function handleProfile(req, res){
    console.log(req);
    res.send('프로필 화면입니다.');
}

app.get('/', handleHome);
app.get('/profile', handleProfile);

function handleListening(){
    console.log(`Example app listening on port ${PORT}!`);
}

app.listen(PORT, handleListening);
