import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000","https://easyexitfrontendfinal.onrender.com"],
  credentials: true
    }));

import connDB from './src/config/db.config.js';

connDB();

import authRoutes from './src/routes/auth.routes.js';
app.use('/', authRoutes);

import studentRoutes from './src/routes/student.routes.js';
app.use('/student', studentRoutes);

import adminRoutes from './src/routes/admin.routes.js';
app.use('/admin', adminRoutes);

import guardRoutes from './src/routes/guard.routes.js';
app.use('/guard', guardRoutes);


app.use("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}!`);
});
