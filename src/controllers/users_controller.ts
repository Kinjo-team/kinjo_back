import { Request, Response } from "express";
import { addNewUser, deleteUser, getUserByFirebaseUUID } from "../models/users";

export const createNewUser = async (req: Request, res: Response) => {
  console.log(req.body);

  const user = req.body;
  try {
    const newUser = await addNewUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to add user to database" });
  }
};

export const deleteExistingUser = async (req: Request, res: Response) => {
  const uid = String(req.params.uid);
  console.log(uid);

  try {
    const deletedUser = await deleteUser(uid);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Unable to remove user from database" });
  }
};

export const getUserByUUID = async (req: Request, res: Response) => {
  const uid = String(req.params.uid);
  console.log(uid);

  try {
    const user = await getUserByFirebaseUUID(uid);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to find user in database" });
  }
};
