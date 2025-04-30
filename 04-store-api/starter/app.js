require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const productsRouter = require('./routes/products');
const port = process.env.PORT || 3000;

app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>');
});
app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(port, () => {
            console.log(`Server is listening port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
