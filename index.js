import './config/config.js';

import express from 'express';
import cors from "cors";
import logger from "./helper/logger.js";
import router from "./routers/router.js";
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 60,                // Limit each IP to 60 requests per window
  standardHeaders: true,  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,   // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests. Please try again later.' }
});

const app = express();

app.use(cors());

app.set('trust proxy', 1);
app.use(limiter);

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});