import { Router } from "express";
import { resources, getResourceBy } from "./../../controllers/resource-controller.js";

const router = new Router();

router.get('/:resourceType', resources);
router.get('/:resourceType/:resourceId/:by/:entityId', getResourceBy);

export default router;