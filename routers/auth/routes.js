import { Router } from "express";
import { callback, oauth, login } from "./../../controllers/auth-controller.js";

const router = new Router();

router.get('/login', login);
router.get('/oauth', oauth);
router.get('/callback', callback);

export default router;