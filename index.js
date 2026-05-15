import './config/config.js';

import express from 'express';
import cors from "cors";
import logger from "./helper/logger.js";
import router from "./routers/router.js";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});