import { Request, Response, RequestHandler } from "express";
import { ProductService } from "../services/product.service";

export const generateProductController: RequestHandler = (req: Request, res: Response): void => {
    try {
        const { data } = req.body;

        if (!data) {
            res.status(400).json({ error: "Données requises" });
            return;
        }

        const schema = ProductService.generateProductSchema(data);
        res.status(200).json(schema);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
