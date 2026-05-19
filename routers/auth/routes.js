import { Router } from "express";
import { callback, oauth, login, refresh } from "./../../controllers/auth-controller.js";
import authMiddleware from "./../../middleware/auth.js";
import webUserAuthMiddleware from "./../../middleware/web-user-auth.js";

const router = new Router();

router.get('/login', authMiddleware, login);
router.get('/refresh', authMiddleware, refresh);
router.get('/oauth', webUserAuthMiddleware, authMiddleware, oauth);
router.get('/callback', callback);

export default router;