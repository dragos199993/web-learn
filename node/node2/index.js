let express = require('express');
let app = express();
let server = app.listen(4400, running);
function running(){
    console.log('Server is running...');
}

//Point to static public 
app.use(express.static('public'));

//Firebase
let firebase = require('firebase');
let config = require('./config');
firebase.initializeApp(config);
let database = firebase.database();


function writeData(user,key, text){
    firebase.database().ref('post/' + key).set({
        username: user,
        text: text
    })
}
writeData('Dragos',1,'This is a test');