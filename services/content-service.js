import jwt from "jsonwebtoken";

export const getHeaders = async (accessToken) => {
    return {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken,
        'x-client-id': jwt.decode(accessToken)?.client_id
    };
}