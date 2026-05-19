import CryptoJS from "crypto-js";
import '../config/config.js';
import logger from "../helper/logger.js";
import stringify from "json-stable-stringify";
import { LRUCache } from 'lru-cache';

// Configure the cache
const nonceCache = new LRUCache({
  max: 50000,              // Maximum number of nonces to hold in memory
  ttl: 1000 * 60 * 5,      // Automatically delete nonces after 5 minutes
  ttlAutopurge: true       // Actively delete expired items in the background
});

function validateNonce(nonce) {
  // If the nonce is already in the cache, it's a duplicate
  if (nonceCache.has(nonce)) {
    return false; 
  }

  // Otherwise, store it and allow the request
  nonceCache.set(nonce, true);
  return true;
}

export default async (req, res, next) => {
    try {
        if (!req.body) {
            req.body = {};
        }

        const serverAppId = process.env.APPLICATION_ID;
        const serverTimestamp = Date.now();

        const clientAppId = req.headers['x-application-id'];
        const clientTimestamp = Number(req.headers['x-timestamp']);
        const clientSignature = req.headers['x-signature'];
        const clientNonce = req.headers['x-nonce'];

        if (!validateNonce(clientNonce)) {
            return res.reply(400, `Duplicate Request!`);
        }

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

        const message = `${clientTimestamp}:${clientNonce}:${stringify(req.body)}`;
        const serverSignature = CryptoJS.HmacSHA256(message, clientNonce).toString();

        if (clientSignature !== serverSignature) {
            return res.reply(400, "Invalid signature");
        }

        next();
    } catch (err) {
        logger.error("Auth middleware error:", err);
        return res.reply(500, "Internal server error", err);
    }
}