import './../config/config.js';
import { getHeaders } from "./content-service.js";
import { GetAsync } from "./../helper/fetcher/fetcher.js";

const env = process.env;

const BASE_URL = env.QURAN_REFLECT_BASE_URL;

export const getUserProfile = async (accessToken) => {

    const url = `${BASE_URL}/users/profile`;

    const headers = await getHeaders(accessToken);

    return await GetAsync(url, headers);
};