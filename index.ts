import express from 'express';
import cors from 'cors';
import { redis } from './configs/redis_config.js';
import { router as userRouter } from './routers/users/user.router.js';
import { mongodbConnection } from './configs/db_config.js';

const app = express();
app.use(cors());
app.use(express.json());

mongodbConnection();

redis.on('connect', () => {
    console.log('Connected to Redis');
})

redis.on('error', (err) => {
    console.log('Error connecting to Redis', err);
})

app.get('/health', (req, res) => {
    res.json({message: "Server is running"});
})

// routings
app.use('/api/v1/auth', userRouter);

//server setup
app.listen(8000, () => {
    console.log('Auth Service is running on port 8000');
});