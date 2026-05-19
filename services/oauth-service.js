import './../config/config.js';
import { PostAsync } from "./../helper/fetcher/fetcher.js"
import logger from "./../helper/logger.js";

const env = process.env;

const TOKEN_URL = env.QURAN_API_TOKEN_URL;
const OAUTH_URL = env.QURAN_API_OAUTH_URL;

const KEY_REDIRECT_URI = env.KEY_REDIRECT_URI || ""
const KEY_CLIENT_ID = env.KEY_CLIENT_ID || ""
const KEY_GRANT_TYPE = env.KEY_GRANT_TYPE || ""
const KEY_SCOPE = env.KEY_SCOPE || ""
const KEY_CODE = env.KEY_CODE || ""
const KEY_RESPONSE_TYPE = env.KEY_RESPONSE_TYPE || ""
const KEY_STATE = env.KEY_STATE || ""

const RESPONSE_TYPE = env.VALUE_RESPONSE_TYPE
const CLIENT_ID = env.QURAN_API_CLIENT_ID
const GRANT_TYPE = env.VALUE_GRANT_TYPE
const SCOPE = env.VALUE_SCOPE
const REDIRECT_URI = env.VALUE_REDIRECT_URI

const username = CLIENT_ID
const password = env.QURAN_API_CLIENT_SECRET

const auth = Buffer
  .from(`${username}:${password}`)
  .toString('base64')

const HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Basic ${auth}`
}

const BODY = {
  [KEY_CLIENT_ID]: CLIENT_ID,
  [KEY_GRANT_TYPE]: GRANT_TYPE,
  [KEY_SCOPE]: SCOPE,
  [KEY_REDIRECT_URI]: REDIRECT_URI
}

export async function getAccessToken(code) {
  let body = { ...BODY };
  
  if (code) {
    body[KEY_CODE] = code;
  } else {
    delete body[KEY_REDIRECT_URI];
  }

  return await PostAsync(
    TOKEN_URL, 
    HEADERS, 
    body
  )
}

export function getOAuthUrl() {
  const state = Buffer.from(Date.now().toString()).toString('base64');

  return `${OAUTH_URL}?${KEY_CLIENT_ID}=${CLIENT_ID}&${KEY_REDIRECT_URI}=${REDIRECT_URI}&${KEY_RESPONSE_TYPE}=${RESPONSE_TYPE}&${KEY_SCOPE}=${SCOPE}&${KEY_STATE}=${state}`;
}