import { Router } from "express";
import { profile } from "./../../controllers/user-controller.js";

const router = new Router();

router.get('/profile', profile);

export default router;