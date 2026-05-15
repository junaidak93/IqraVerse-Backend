import fetch from 'node-fetch'
import { generateBodyString, prepareBody } from "./body-formatter.js";
import logger from "./../logger.js";

const GET = "GET"
const POST = "POST"

const doFetch = async (url, method, headers, body = null) => {
    const response = await fetch(url, {
        method,
        headers,
        body
    });

    if (response.ok) {
        return await response.json()
    }
    
    throw await response.json()
}

export const GetAsync = async (url, headers, params = {}) => {
    if (params && Object.keys(params).length > 0) {
        url += `?${generateBodyString(params)}`
    }

    return await doFetch(url, GET, headers)
}

export const PostAsync = async (url, headers, body = {}) => {
    return await doFetch(url, POST, headers, prepareBody(headers, body))
}