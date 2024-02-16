export const baseURL = "http://127.0.0.1:8000";
export const fastAPIURL = "http://127.0.0.1:8080";

export const ApiConfig = {
    login: `${baseURL}/login/`,
    logout: `${baseURL}/logout/`,
    organizations: `${baseURL}/organizations`,
    parkings: `${baseURL}/parkings`,
    cctvs: `${baseURL}/cctvs`,
    admins: `${baseURL}/admins`,
    cctvFeed: `${fastAPIURL}/video_feed`
};