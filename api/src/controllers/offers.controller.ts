import { Request, Response, RequestHandler } from "express";
import { OffersService } from "../services/offers.service";
import { ZodError } from "zod";

export const generateOffersController: RequestHandler = (req: Request, res: Response): void => {
    try {
        if (!req.body || !req.body.data) {
            res.status(400).json({ error: "Données requises" });
            return;
        }

        const schema = OffersService.generateSchema(req.body.data);
        res.status(200).json(schema);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ errors: error.flatten() });
        } else {
            res.status(400).json({ error: (error as Error).message });
        }
    }
};
