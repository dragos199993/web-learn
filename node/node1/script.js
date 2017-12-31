let fs = require('fs');



var db = require('./words.json');
console.log(db);
console.log('server is starting...');

var express = require('express');

var app = express();

var server = app.listen(3000, callback);

function callback() {
    console.log('listening...');
}

app.use(express.static('website'));

app.get('/add/:item/:number?', addItem);

function addItem(request, response) {
    let reply;
    let data = request.params;
    let itemName = data.item;
    let number = Number(data.number);
    if (!number) {
        reply = {
            msg: "score is required"
        }
    } else {
        db[itemName] = number;
        fs.writeFile('words.json', JSON.stringify(db, null, 2), finished);
        function finished(err){
            console.log('operation finished');
        }
        reply = {
            msg: "thanks for reply"
        }
    }

    console.log(db.length);
    response.send(reply.msg);
}

app.get('/all', getAll);

function getAll(request, response) {
    response.send(db);
}

app.get('/search/:word', searchWord);

function searchWord(request, response){
    let word = request.params.word;
    let reply;
    if(db[word]){
        reply = {
            status: 'found',
            word: word,
            number: db[word],
        }
    }else{
        reply = {
            status: 'not found',
            word: word,
        }
    }

    response.send(`${reply.word} was ${reply.status}`);
}
