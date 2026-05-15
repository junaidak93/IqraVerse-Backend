import { Router } from "express";
import { healthCheck } from "./../../controllers/health-controller.js";

const router = new Router();

router.get('/', healthCheck);

export default router;