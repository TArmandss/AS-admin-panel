import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoDB from './models/db.js';
import orderRoutes from './Routes/orderRoutes.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json()); // enabling req.body
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', "PUT"],
        credentials: true
    })
);
mongoDB();

app.use('/api', orderRoutes );

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
