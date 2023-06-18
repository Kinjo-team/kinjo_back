import { Request, Response } from "express";

import { addFollower, deleteFollower, getFollowers, getFollowing, checkIfUserIsFollowing } from "../models/followers";

export const getAllFollowersFromUserByID = async (req: Request, res: Response) => {
    const {uid} = req.params;
    try {
        const followers = await getFollowers(uid);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ error: "Unable to find followers in database" });
    }
}

export const getAllFollowingFromUserByID = async (req: Request, res: Response) => {
    const {uid} = req.params;
    try {
        const following = await getFollowing(uid);
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ error: "Unable to find following in database" });
    }
}

export const createNewFollower = async (req: Request, res: Response) => {
    const {firebase_uid, follower_uid} = req.body;
    console.log(firebase_uid, follower_uid)
    try {
        const newFollower = await addFollower(firebase_uid, follower_uid);
        res.status(201).json(newFollower);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to add follower to database" });
    }
}

export const deleteExistingFollow = async (req: Request, res: Response) => {
    const {firebase_uid, follower_uid} = req.body;
    try {
        const deletedFollower = await deleteFollower(firebase_uid, follower_uid);
        res.status(200).json(deletedFollower);
    } catch (error) {
        res.status(500).json({ error: "Unable to remove follower from database" });
    }
}

export const checkIfUserIsFollowingByID = async (req: Request, res: Response) => {
    const {firebase_uid, follower_uid} = req.body;
    console.log(firebase_uid, follower_uid)
    try {
        const isFollowing = await checkIfUserIsFollowing(firebase_uid, follower_uid);
        res.status(200).json(isFollowing);
    } catch (error) {
        res.status(500).json({ error: "Unable to find following in database" });
    }
}