import CryptoJS from "crypto-js";
import '../config/config.js';
import logger from "../helper/logger.js";
import stringify from "json-stable-stringify";

export default async (req, res, next) => {
    try {
        req.headers['x-application-id'] = req.query['x-application-id'];
        req.headers['x-timestamp'] = req.query['x-timestamp'];
        req.headers['x-signature'] = req.query['x-signature'];
        req.headers['x-nonce'] = req.query['x-nonce'];

        next();
    } catch (err) {
        logger.error("Web Auth middleware error:", err);
        return res.reply(500, "Internal server error", err);
    }
}