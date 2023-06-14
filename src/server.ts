import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { PrismaClient } from "../node_modules/.prisma/client";
const translateText = require("./utils/translateFunc.js");
const detectLanguage = require("./utils/detectLangFunc.js");

import {
  searchItineraries,
  getAllItineraries,
  getItineraryByName,
  // getItineraryByID,
  // getItineraryByCreatorID,
  getItinerariesWithTags,
  //   getItinerariesWithDurationGreaterThan,
  //   getItinerariesWithDurationLessThan,
  //   getLocationsByItineraryName,
  //   getLocationsByItineraryId,
  addItinerary,
  //   updateItinerary,
  //   delItineraryByName,
  //   delItineraryByItineraryID,
  //   delItineraryByCreatorID,
} from "./controllers/itineraries_controller";

import {
  getAllLocations,
  //   getLocationByLocationID,
  //   getLocationsByCreatorID,
  getLocationsByLocationName,
  //   getLocationsByTags,
  //   getLocationsWithDurationGreaterThan,
  //   getLocationsWithDurationLessThan,
  // addLocation,
  // updateLocation,
  // deleteLocByLocID,
  //   deleteLocsByCreatorID,
} from "./controllers/locations_controller";

import {
  validateName,
  validateID,
  validateDuration,
} from "./validation/validator_params";

import {
  createNewUser,
  deleteExistingUser,
  getUserByUUID,
  getUserByName
} from "./controllers/users_controller";

import { addLikes, fetchTotalLikes } from "./controllers/likes_controller";

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
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/", "index.html"));
});

// itineraries_controller.ts
app.get("/search", searchItineraries);
app.get("/itineraries", getAllItineraries);
app.get("/itineraries/name/:name", validateName, getItineraryByName);
// app.get("/itineraries/id/:id", validateID, getItineraryByID);
app.get("/itineraries/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itinerary = await prisma.itineraries.findUnique({
      where: {
        itinerary_id: parseInt(id),
      },
      include: {
        itinerary_locations: {
          include: {
            location: true,
          },
        },
      },
    });

    if (!itinerary) {
      return res.status(404).send("Itinerary not found");
    }

    return res.json(itinerary);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// app.get("/itineraries/creator/:id", validateID, getItineraryByCreatorID);
app.get("/itineraries/tags", getItinerariesWithTags);
// app.get('/itineraries/duration/greater/:duration', validateDuration, getItinerariesWithDurationGreaterThan); //FIX
// app.get('/itineraries/duration/less/:duration', validateDuration, getItinerariesWithDurationLessThan); //FIX
app.post("/itineraries", addItinerary);
// app.patch('/itineraries', updateItinerary);
// app.delete('/itineraries/name/:name', validateName, delItineraryByName);
// app.delete('/itineraries/id/:id', validateID, delItineraryByItineraryID);
// app.delete('/itineraries/creator/:id', validateID, delItineraryByCreatorID);

// locations_controller.ts
app.get("/locations", getAllLocations);
// app.get('/locations/id/:id', validateID, getLocationsByItineraryId);
// app.get('/locations/creator/:id', validateID, getLocationsByCreatorID);
app.get("/locations/name/:name", validateName, getLocationsByLocationName);
// app.get('/locations/tags', getLocationsByTags);
// app.get('/locations/duration/greater/:duration', validateDuration, getLocationsWithDurationGreaterThan);
// app.get('/locations/duration/less/:duration', validateDuration, getLocationsWithDurationLessThan);
// app.post("/locations", addLocation);
// app.patch("/locations", updateLocation);
// app.delete("/locations/id/:id", validateID, deleteLocByLocID);
// app.delete('/locations/creator/:id', validateID, deleteLocsByCreatorID);

// users_controller.ts
app.post("/users", createNewUser);
app.get("/users/username/:username", getUserByName);
app.delete("/users/:uid", deleteExistingUser);
app.get("/users/:uid", getUserByUUID);

//likes_controller.ts
app.get("/likes/total/:itinerary_id", fetchTotalLikes(prisma));
app.post("/likes", addLikes);

// translate
app.post("/translate", async (req, res) => {
  const text = req.body.text;
  const detected = await detectLanguage(text);
  console.log(detected);
  const translated = await translateText(text);
  res.send(translated);
});

// //Listen
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
