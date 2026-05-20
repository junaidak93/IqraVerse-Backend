import { 
    getUserProfile, 
    getBookmarks, 
    addBookmark, 
    removeBookmark,
    syncBookmarks
} from "./../services/user-service.js";
import logger from "./../helper/logger.js";

const profile = async (req, res) => {
    try {
        const userProfile = await getUserProfile(req.headers['x-auth-token']);
        return res.reply(200, "User Profile retrieved successfully", userProfile);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to retrieve user profile", err);
    }
}

const bookmarks = async (req, res) => {
    try {
        const bookmarkList = await getBookmarks(req.headers['x-auth-token'], req.query.first, req.query.after);
        return res.reply(200, "Bookmarks retrieved successfully", bookmarkList);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to retrieve bookmarks", err);
    }
}

const addBookMark = async (req, res) => {
    try {
        const response = await addBookmark(req.headers['x-auth-token'], req.body.surah_id, req.body.ayah_id);
        return res.reply(200, "Bookmark added successfully", response);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to add bookmark", err);
    }
}

const removeBookMark = async (req, res) => {
    try {
        const response = await removeBookmark(req.headers['x-auth-token'], req.params.bookmark_id);
        return res.reply(200, "Bookmark deleted successfully", response);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to delete bookmark", err);
    }
}

const syncBookMarks = async (req, res) => {
    try {
        const bookmarkList = await syncBookmarks(req.headers['x-auth-token'], req.body.bookmarks);
        return res.reply(200, "Bookmarks synced successfully", bookmarkList);
    } catch (err) {
        logger.error(JSON.stringify(err));
        return res.reply(500, "Failed to sync bookmarks", err);
    }
}

export { profile, bookmarks, addBookMark, removeBookMark, syncBookMarks };