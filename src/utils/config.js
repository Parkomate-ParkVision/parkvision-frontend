export const baseURL = "https://2031-58-84-60-73.ngrok-free.app";
export const fastAPIURL = "http://127.0.0.1:8080";

export const ApiConfig = {
    login: `${baseURL}/login/`,
    logout: `${baseURL}/logout/`,
    organizations: `${baseURL}/organizations`,
    parkings: `${baseURL}/parkings`,
    cctvs: `${baseURL}/cctvs`,
    vehicles: `${baseURL}/vehicles`,
    admins: `${baseURL}/admins`,
    cctvFeed: `${fastAPIURL}/video_feed`
};