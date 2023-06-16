import { Request, Response } from "express";
import { translate } from "../models/translate"

export async function translateText (req: Request, res: Response) {

    const text: string = req.body.text;
    
    try {
        const translatedText: string = await translate(text);
        res.status(200).send(translatedText);

    } catch (error) {
        res
          .status(500)
          .json({ error: "An error during translation" });
      }
};