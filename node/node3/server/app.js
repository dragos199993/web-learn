import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express(); //initialize express

mongoose.connect('mongodb://127.0.0.1/nedsilon', () => {
    console.log('MongoDB started ...');
});
app.use(bodyParser.json());
app.use('/api',routes);

export default app;