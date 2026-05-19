import { Router } from "express";
import bodyParser from 'body-parser';
import authRoutes from "./auth/routes.js";
import healthRoutes from "./health/routes.js";
import resourceRoutes from "./resources/routes.js";
import userRoutes from "./user/routes.js";

import response from "./../middleware/response.js";
import authMiddleware from "./../middleware/auth.js";

const router = Router();

// create application/json parser
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use('/health', jsonParser, response, healthRoutes);
router.use('/auth', jsonParser, response, authRoutes);
router.use('/resources', jsonParser, response, authMiddleware, resourceRoutes);
router.use('/user', jsonParser, response, authMiddleware, userRoutes);

export default router;