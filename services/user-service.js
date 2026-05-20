import './../config/config.js';
import { getHeaders } from "./content-service.js";
import { GetAsync, PostAsync, DeleteAsync } from "./../helper/fetcher/fetcher.js";

const env = process.env;

const QURAN_REFLECT_BASE_URL = env.QURAN_REFLECT_BASE_URL;
const QURAN_USER_AUTH_BASE_URL = env.QURAN_USER_AUTH_BASE_URL;

export const getUserProfile = async (accessToken) => {

    const url = `${QURAN_REFLECT_BASE_URL}/users/profile`;

    const headers = await getHeaders(accessToken);

    return await GetAsync(url, headers);
};

export const getBookmarks = async (accessToken, first, after) => {
    let url = `${QURAN_USER_AUTH_BASE_URL}/bookmarks?mushafId=4&first=${first}`;

    if (after) {
        url += `&after=${after}`;
    }

    const headers = await getHeaders(accessToken);

    return await GetAsync(url, headers);
};

export const addBookmark = async (accessToken, surah_id, ayah_id) => {
    const url = `${QURAN_USER_AUTH_BASE_URL}/bookmarks`;
    
    const headers = await getHeaders(accessToken);

    return await PostAsync(url, headers, {
        type: "ayah",
        key: surah_id,
        verseNumber: ayah_id,
        mushafId: 4,
        mushaf: 4
    });
}

export const removeBookmark = async (accessToken, bookmak_id) => {
    const url = `${QURAN_USER_AUTH_BASE_URL}/bookmarks/${bookmak_id}`;
    
    const headers = await getHeaders(accessToken);

    return await DeleteAsync(url, headers);
}

export const syncBookmarks = async (accessToken, bookmarks) => {
    for (const bookmark of bookmarks) {
        await addBookmark(accessToken, bookmark.surah_id, bookmark.ayah_id);
    }

    return await getBookmarks(accessToken, 20);
}