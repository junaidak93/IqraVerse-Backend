import { getResources, getResourceById } from "./../services/resource-service.js";
import logger from "./../helper/logger.js";

const resources = async (req, res) => {
    try {
        const resources = await getResources(req.headers['x-auth-token'], req.params.resourceType);
        return res.reply(200, "Resources retrieved successfully", resources);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to retrieve resources", err);
    }
}

const getResourceBy = async (req, res) => {
    try {
        const resources = await getResourceById(req.headers['x-auth-token'], req.params.resourceType, req.params.resourceId, req.params.by, req.params.entityId, req.query.per_page, req.query.page);
        return res.reply(200, "Resources retrieved successfully", resources);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to retrieve resources", err);
    }
}

export { resources, getResourceBy };