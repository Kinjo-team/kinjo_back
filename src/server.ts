import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; 
import { PrismaClient } from '@prisma/client';
import { query, validationResult } from 'express-validator';

dotenv.config();

// const express = require('express');
const app: Express = express();
const PORT = process.env.PORT || 8000;

// const corsOptions = {
//     origin: "http://localhost:3000"
// }

export const prisma = new PrismaClient();

//Middleware
app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());

//Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
})

//Listen
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    }
);

