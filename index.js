import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fetch from 'node-fetch';
import cors from "cors";

import { getAccessToken } from "./services/oauth-service.js";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/health', (_, res) => {
  res.send({
    "status": "ok"
  });
});

/*
|--------------------------------------------------------------------------
| OAuth Callback
|--------------------------------------------------------------------------
|
| Quran.com redirects here after login.
|
*/

app.get('/api/auth/callback', async (req, res) => {
  try {

    console.log('Received auth callback with query:', req.query);

    const { code } = req.query;

    if (!code) {
      return res.status(400).send('Missing auth code');
    }

    /*
    |--------------------------------------------------------------------------
    | Exchange auth code for access token
    |--------------------------------------------------------------------------
    */

    const tokenData = await getAccessToken(code);

    console.log(tokenData);

    /*
    |--------------------------------------------------------------------------
    | Redirect back into mobile app
    |--------------------------------------------------------------------------
    */

    const mobileRedirect =
      `${process.env.DEEP_LINK}
      ?${process.env.KEY_ACCESS_TOKEN}=${tokenData.access_token}
      &${process.env.KEY_REFRESH_TOKEN}=${tokenData.refresh_token}`

    return res.redirect(mobileRedirect);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .send('OAuth failed');
  }
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});