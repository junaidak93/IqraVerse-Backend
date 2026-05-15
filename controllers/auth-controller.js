import { getAccessToken, getOAuthUrl } from "./../services/oauth-service.js";
import logger from "./../helper/logger.js";

const login = async (req, res) => {
    try {
        const tokenData = await getAccessToken();
        return res.reply(200, "Login successful", tokenData);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Login failed");
    }
}

const oauth = (req, res) => {
    res.redirect(getOAuthUrl());
}

const callback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
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

        return res.redirect(mobileRedirect);

    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "OAuth failed");
    }
}

export { callback, oauth, login };