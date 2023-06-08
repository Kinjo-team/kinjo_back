import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; 
import { PrismaClient } from '@prisma/client';

dotenv.config();

// const express = require('express');
const app: Express = express();
const PORT = process.env.PORT || 8000;

// const corsOptions = {
//     origin: "http://localhost:3000"
// }

export const prisma = new PrismaClient();

app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    }
);