import CryptoJS from "crypto-js";
import '../config/config.js';
import logger from "../helper/logger.js";

export default async (req, res, next) => {
    next();
    return;
    
    try {
        if (!req.body) {
            req.body = {};
        }

        const serverSalt = process.env.SALT;
        const serverAppId = process.env.APPLICATION_ID;
        const serverTimestamp = Date.now();

        const clientAppId = req.headers['x-application-id'];
        const clientTimestamp = Number(req.headers['x-timestamp']);
        const clientSignature = req.headers['x-signature'];

        if (!clientAppId || clientAppId !== serverAppId) {
            return res.reply(400, `${!clientAppId ? "Missing" : "Invalid"} application ID`);
        }

        if (!clientTimestamp) {
            return res.reply(400, "Missing timestamp");
        }

        if (!clientSignature) {
            return res.reply(400, "Missing signature");
        }

        if (serverTimestamp - clientTimestamp > 30000) { // 30 seconds
            return res.reply(400, "Request expired");
        }

        const message = `${clientTimestamp}:${JSON.stringify(req.body)}`;
        const serverSignature = CryptoJS.HmacSHA256(message, serverSalt).toString();

        if (clientSignature !== serverSignature) {
            return res.reply(400, "Invalid signature");
        }

        next();
    } catch (err) {
        logger.error("Auth middleware error:", err);
        return res.reply(500, "Internal server error", err);
    }
}