import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoDB from './modals/db.js';
import orderRoutes from './Routes/orderRoutes.js';
import authRoute from './Routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
);
mongoDB();

app.use('/api', orderRoutes);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
