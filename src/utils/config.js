// export const baseURL = "https://03d9-58-84-61-175.ngrok-free.app";
export const baseURL = "http://127.0.0.1:8000";
export const fastAPIURL = "http://127.0.0.1:8080";

export const ApiConfig = {
    login: `${baseURL}/login/`,
    logout: `${baseURL}/logout/`,
    organizations: `${baseURL}/organizations`,
    parkings: `${baseURL}/parkings`,
    cctvs: `${baseURL}/cctvs`,
    vehicles: `${baseURL}/vehicles`,
    getVehiclesByOrganization: `${baseURL}/organization-vehicles`,
    unverifiedVehicles: `${baseURL}/unverified-vehicles`,
    admins: `${baseURL}/admins`,
    verification: `${baseURL}/verify-vehicle`,
    cctvFeed: `${fastAPIURL}/video_feed`,
    gates: `${baseURL}/gates`,
};