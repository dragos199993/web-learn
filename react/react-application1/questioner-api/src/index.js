import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import auth from './routes/auth';
import user from './routes/user';
import questions from './routes/questions.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

app.use('/api/auth', auth);
app.use('/api/user',user);
app.use('/api/questions',questions);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(8080, () => {
    console.log('Running on localhost:8080...');
});