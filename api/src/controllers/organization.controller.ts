import { Request, Response, RequestHandler } from "express";
import { OrganizationService } from "../services/organization.service";
import { ZodError } from "zod";

export const generateOrganizationController: RequestHandler = (req: Request, res: Response): void => {
    try {
        if (!req.body || !req.body.data) {
            res.status(400).json({ error: "Données requises" });
            return;
        }

        const schema = OrganizationService.generateSchema(req.body.data);
        res.status(200).json(schema);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ errors: error.flatten() });
        } else {
            res.status(400).json({ error: (error as Error).message });
        }
    }
};
