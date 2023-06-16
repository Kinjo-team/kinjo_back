import { Request, Response } from "express";
import { addBookmark, deleteBookmark, getAllBookmarksFromUser } from "../models/bookmarks";

export const createNewBookmark = async (req: Request, res: Response) => {
    const bookmark = req.body;
    try {
        const newBookmark = await addBookmark(bookmark.firebase_uuid, bookmark.itinerary_id);
        res.status(201).json(newBookmark);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to add bookmark to database" });
    }
}

export const deleteExistingBookmark = async (req: Request, res: Response) => {
    const bookmark = req.body;
    try {
        const deletedBookmark = await deleteBookmark(bookmark.firebase_uuid, bookmark.itinerary_id);
        res.status(200).json(deletedBookmark);
    } catch (error) {
        res.status(500).json({ error: "Unable to remove bookmark from database" });
    }
}

export const getAllBookmarksFromUserByID = async (req: Request, res: Response) => {
    const uid = String(req.params.uid);
    try {
        const bookmarks = await getAllBookmarksFromUser(uid);
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: "Unable to find bookmarks in database" });
    }
}