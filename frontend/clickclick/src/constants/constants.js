const STAGE = import.meta.env.VITE_API_STAGE;
const APIGATEWAY_URL = import.meta.env.VITE_API_APIGATEWAY_URL;
export const API_URL = `${APIGATEWAY_URL}/${STAGE}`;

