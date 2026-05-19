import { getUserProfile } from "./../services/user-service.js";
import logger from "./../helper/logger.js";

const profile = async (req, res) => {
    try {
        const userProfile = await getUserProfile(req.headers['x-auth-token']);
        return res.reply(200, "User Profile retrieved successfully", resources);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to retrieve user profile", err);
    }
}

export { profile };