const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) =>{
    jwt.verifyToken(req.token, 'secretkey', (err, authdata) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created...',
                authdata
            });
        }
    })
});

app.post('/api/login', (req, res) =>{
    const user = {
        id: 1,
        username: 'Dragos',
        email: 'dragos@google.ro',
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
})

function verifyToken(req, res, next){
    const bearerHeader = req.header['authorization']; 
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log('Server started on port 3000 ...'))
