import { Router } from "express";
import { 
    profile, 
    bookmarks, 
    addBookMark, 
    removeBookMark, 
    syncBookMarks 
} from "./../../controllers/user-controller.js";

const router = new Router();

router.get('/profile', profile);
router.get('/bookmarks', bookmarks);
router.post('/bookmarks', addBookMark);
router.delete('/bookmarks/:bookmark_id', removeBookMark);
router.post('/bookmarks-sync', syncBookMarks);

export default router;