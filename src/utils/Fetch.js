export default class Fetch {
    constructor(isAuth = false) {
        this.headers = isAuth ? {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
            "X-timezone-region": Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
        } : {
            "Content-Type": `application/json`,
            "X-timezone-region": Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
        };
    }
    static async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: this.headers,
        });
        return response;
    }
    static async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: data instanceof FormData ? data : JSON.stringify(data),
        });
        return response;
    }
    static async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return response;
    }
    static async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.headers,
        });
        return response;
    }
}