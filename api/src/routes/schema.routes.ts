import { Router } from "express";
import { generateOrganizationController } from "../controllers/organization.controller";
import { generatePersonController } from "../controllers/person.controller";
import { generateOffersController } from "../controllers/offers.controller";
import { generateProductController } from "../controllers/product.controller";
import { generateEventController } from "../controllers/event.controller";

const router = Router();

router.post("/organization", generateOrganizationController);
router.post("/person", generatePersonController);
router.post("/offers", generateOffersController);
router.post("/product", generateProductController);
router.post("/event", generateEventController);

export default router;
