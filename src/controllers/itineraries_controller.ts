import { Request, Response } from "express";
import {v2 as cloudinary} from "cloudinary";

import {
  fetchItinerariesBySearchOption,
  fetchPredictedSearchTerms,
  fetchAllItineraries,
  fetchItineraryByName,
  fetchItinerariesWithTags,
  fetchItinerariesByFirebaseID,
  createItinerary,
  fetchNearbyItineraries,
  fetchItinerariesByUsername,
  deleteItineraryById,
} from "../models/itineraries";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { validationResult } from "express-validator";

export const searchItineraries = async (req: Request, res: Response) => {
  const option = req.query.option as string;
  const value = req.query.value as string;

  try {
    const itineraries = await fetchItinerariesBySearchOption(option, value);
    console.log(itineraries);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching itineraries." });
  }
};

export const autocompleteSearch = async (req: Request, res: Response) => {
  const option = req.query.option as string;
  const value = req.query.value as string;

  try {
    const terms = await fetchPredictedSearchTerms(option, value);
    console.log(terms);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(terms);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching autocomplete suggestions." });
  }
};

export const getAllItineraries = async (_req: Request, res: Response) => {
  try {
    const itineraries = await fetchAllItineraries();
    console.log(itineraries);
    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching itineraries." });
  }
};

export const getItineraryByName = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.params;
  try {
    const itinerary = await fetchItineraryByName(name);
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: "Itinerary not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the itinerary." });
  }
};

export const getItinerariesByFirebaseID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const itineraries: any = await fetchItinerariesByFirebaseID(id);
    if (itineraries) {
      res.status(200).json(itineraries);
    } else {
      res.status(404).json({ message: "Itineraries not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the itineraries." });
  }
};

export const getItinerariesByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const itineraries = await fetchItinerariesByUsername(username);
    if (itineraries) {
      res.status(200).json(itineraries);
    } else {
      res.status(404).json({ message: "Itineraries not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the itineraries." });
  }
};

export const getItinerariesWithTags = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { tags } = req.body;
  try {
    const itineraries = await fetchItinerariesWithTags(tags);
    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching itineraries." });
  }
};

export const addItinerary = async (req: Request, res: Response) => {
  try {
    if (req.files && req.files.loc_image_file) {
      const file = req.files.loc_image_file;

      const result = await cloudinary.uploader.upload(file.path);

      req.body.loc_image_url = result.secure_url;
    }

    const id = await createItinerary(req.body);
    console.log("request body from controller:", req.body);
    res.json({ message: "Data inserted successfully", id: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNearbyItineraries = async (req: Request, res: Response) => {
  const { lat, lon } = req.body;
  try {
    const itineraries = await fetchNearbyItineraries(lat, lon);

    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching itineraries." });
  }
};


// DELETE
export const deleteItinerary = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const itinerary = await deleteItineraryById(Number(id));
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: "Itinerary not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the itinerary." });
  }
}
