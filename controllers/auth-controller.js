import { getAccessToken, getOAuthUrl, getRefreshToken } from "./../services/oauth-service.js";
import logger from "./../helper/logger.js";

const login = async (req, res) => {
    try {
        const tokenData = await getAccessToken();
        return res.reply(200, "Login successful", tokenData);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Login failed", err);
    }
}

const refresh = async (req, res) => {
    try {
        const tokenData = await getRefreshToken(req.params.refresh_token);
        return res.reply(200, "Token refresh successful", tokenData);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Token refresh failed", err);
    }
}

const oauth = (req, res) => {
    res.redirect(getOAuthUrl());
}

const callback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            logger.error("callback response: ", JSON.stringify(req.query));
            return res.reply(400, "Missing auth code");
        }

        const tokenData = await getAccessToken(code);

        if (!tokenData || !tokenData.access_token) {
            return res.reply(500, "Failed to obtain access token");
        }

        const mobileRedirect =
            `${process.env.DEEP_LINK}
            ?${process.env.KEY_ACCESS_TOKEN}=${tokenData.access_token}
            &${process.env.KEY_REFRESH_TOKEN}=${tokenData.refresh_token}`;

        logger.log(mobileRedirect);

        return res.redirect(mobileRedirect);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "OAuth failed", err);
    }
}

export { callback, oauth, login, refresh };