import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createVisitedMap, fetchVisitedMap } from "../models/visited_map";

const prisma = new PrismaClient();

export const getVisitedMap = async (req: Request, res: Response) => {
  const { firebase_uuid } = req.params;
  try {
    const visitedMap = await fetchVisitedMap(firebase_uuid);
    res.status(200).json(visitedMap);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching map." });
  }
};

export const createNewVisitedMap = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    await createVisitedMap(req.body);
    res.status(201).json({ message: "Visited map created successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the marker." });
  }
};
