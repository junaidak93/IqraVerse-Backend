import './../config/config.js';
import { getHeaders } from "./content-service.js";
import { GetAsync } from "./../helper/fetcher/fetcher.js";

const env = process.env;

const BASE_URL = env.QURAN_API_CONTENT_BASE_URL;

export const getResources = async (accessToken, resourceType) => {
    if (resourceType !== "translations" && resourceType !== "tafsirs") {
        throw new Error("Invalid resource type");
    }

    const url = `${BASE_URL}/resources/${resourceType}`;

    const headers = await getHeaders(accessToken);

    return await GetAsync(url, headers);
};

export const getResourceById = async (accessToken, resourceType, resourceId, by, entityId, per_page, page) => {
    if (resourceType !== "translations" && resourceType !== "tafsirs") {
        throw new Error("Invalid resource type");
    }

    const url = `${BASE_URL}/${resourceType}/${resourceId}/${by}/${entityId}`;

    if (per_page && page) {
        url += `?per_page=${per_page}&page=${page}`;
    }

    const headers = await getHeaders(accessToken);

    return await GetAsync(url, headers);
}