export const baseURL = "https://2031-58-84-60-73.ngrok-free.app"
export const fastAPIBaseURL = ""

export const ApiConfig = {
    login: `${baseURL}/login/`,
    logout: `${baseURL}/logout/`,
    organizations: `${baseURL}/organizations`,
    parkings: `${baseURL}/parkings`,
    cctvs: `${baseURL}/cctvs`,
    admins: `${baseURL}/admins`,
    vehicles: `${baseURL}/vehicles`,
    cctvFeed: `${fastAPIBaseURL}/video_feed`,
};