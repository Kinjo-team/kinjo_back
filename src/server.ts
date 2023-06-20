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
  getItinerariesByFirebaseID,
  getItinerariesWithTags,
  addItinerary,
  getNearbyItineraries,
  getItinerariesByUsername,
} from "./controllers/itineraries_controller";

import {
  getAllLocations,
  getLocationsByLocationName,
} from "./controllers/locations_controller";

import {
  createNewBookmark,
  deleteExistingBookmark,
  getAllBookmarksFromUserByID,
} from "./controllers/bookmarks_controller";

import {
  createComment,
  deleteExistingComment,
  getCommentsFromItinerary,
} from "./controllers/comments_controller";

import {
  validateName,
  validateID,
  validateDuration,
} from "./validation/validator_params";

import {
  createNewUser,
  deleteExistingUser,
  getUserByUUID,
  getUserByName,
  patchUsernameByName,
} from "./controllers/users_controller";

import {
  getAllFollowersFromUserByID,
  getAllFollowingFromUserByID,
  getFollowerNumberByUsername,
  getFollowingNumberByUsername,
  createNewFollower,
  deleteExistingFollow,
  checkIfUserIsFollowingByID,
} from "./controllers/followers_controller";

import {
  addLikes,
  addDislikes,
  getLikesForItinerary,
  getLikesAndDislikesForItinerary,
} from "./controllers/likes_controller";

import {
  createNewVisitedMap,
  getVisitedMap,
} from "./controllers/visited_map_controller";

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
app.get("/itineraries/user/:id", getItinerariesByFirebaseID);
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
app.get("/itineraries/tags", getItinerariesWithTags);
app.get("/itineraries/:username", getItinerariesByUsername);
app.post("/itineraries", addItinerary);
app.post("/itineraries/nearby", getNearbyItineraries);

// locations_controller.ts
app.get("/locations", getAllLocations);
app.get("/locations/name/:name", validateName, getLocationsByLocationName);

// users_controller.ts
app.post("/users", createNewUser);
app.get("/users/username/:username", getUserByName);
app.delete("/users/:uid", deleteExistingUser);
app.get("/users/:uid", getUserByUUID);
app.patch("/users/:newUsername", patchUsernameByName);

//likes_controller.ts
// likes
app.get("/likes/:id", getLikesForItinerary);
app.post("/likes", addLikes);

// dislikes
app.get("/dislikes/:id", getLikesAndDislikesForItinerary);
app.post("/dislikes", addDislikes);

// translate
app.post("/translate", async (req, res) => {
  const text = req.body.text;
  const detected = await detectLanguage(text);
  console.log(detected);
  const translated = await translateText(text);
  res.send(translated);
});

//bookmarks_controller.ts
app.post("/bookmarks", createNewBookmark);
app.delete("/bookmarks", deleteExistingBookmark);
app.get("/bookmarks/:uid", getAllBookmarksFromUserByID);

//comments_controller.ts
app.post("/comments", createComment);
app.delete("/comments/:commentId", deleteExistingComment);
app.get("/comments/:itineraryId", getCommentsFromItinerary);

// followers_controller.ts
// followers
app.get("/followers/:uid", getAllFollowersFromUserByID);
app.get("/followers/number/:username", getFollowerNumberByUsername);
app.post("/followers", createNewFollower);
app.delete("/followers", deleteExistingFollow);
//following
app.get("/following/:uid", getAllFollowingFromUserByID);
app.get("/following/number/:username", getFollowingNumberByUsername);
app.post("/following/check", checkIfUserIsFollowingByID);

// visited_map_controller.ts
app.get("/visited_map/:firebase_uuid", getVisitedMap);
app.post("/visited_map", createNewVisitedMap);

// //Listen
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
