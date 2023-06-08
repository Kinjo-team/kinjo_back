import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; 
import { PrismaClient } from '@prisma/client';
import { query, validationResult } from 'express-validator';

import {
    getAllItineraries,
    getItineraryByName,
    getItineraryByID,
    getItineraryByCreatorID,
    getItinerariesWithTags,
    getItinerariesWithDurationGreaterThan,
    getItinerariesWithDurationLessThan,
    getLocationsByItineraryName,
    getLocationsByItineraryId,
    addItinerary,
    updateItinerary,
    delItineraryByName,
    delItineraryByItineraryID,
    delItineraryByCreatorID,
  } from './controllers/itineraries_controller';
  
  import {
    getAllLocations,
    getLocationByLocationID,
    getLocationsByCreatorID,
    getLocationsByLocationName,
    getLocationsByTags,
    getLocationsWithDurationGreaterThan,
    getLocationsWithDurationLessThan,
    addLocation,
    updateLocation,
    deleteLocByLocID,
    deleteLocsByCreatorID,
  } from './controllers/locations_controller';

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

// itineraries_controller.ts
app.get('/itineraries', getAllItineraries);
app.get('/itineraries/name/:name', getItineraryByName);
app.get('/itineraries/id/:id', getItineraryByID);
app.get('/itineraries/creator/:id', getItineraryByCreatorID);
app.get('/itineraries/tags', getItinerariesWithTags);
app.get('/itineraries/duration/greater/:duration', getItinerariesWithDurationGreaterThan); //FIX
app.get('/itineraries/duration/less/:duration', getItinerariesWithDurationLessThan); //FIX
app.post('/itineraries', addItinerary);
app.patch('/itineraries', updateItinerary);
app.delete('/itineraries/name/:name', delItineraryByName);
app.delete('/itineraries/id/:id', delItineraryByItineraryID);
app.delete('/itineraries/creator/:id', delItineraryByCreatorID);

// locations_controller.ts
app.get('/locations', getAllLocations);
app.get('/locations/id/:id', getLocationsByItineraryId);
app.get('/locations/creator/:id', getLocationsByCreatorID);
app.get('/locations/name/:name', getLocationsByLocationName);
app.get('/locations/tags', getLocationsByTags);
app.get('/locations/duration/greater/:duration', getLocationsWithDurationGreaterThan);
app.get('/locations/duration/less/:duration', getLocationsWithDurationLessThan);
app.post('/locations', addLocation);
app.patch('/locations', updateLocation);
app.delete('/locations/id/:id', deleteLocByLocID);
app.delete('/locations/creator/:id', deleteLocsByCreatorID);

//Listen
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    }
);

