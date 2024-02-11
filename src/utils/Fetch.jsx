export default class Fetch {
  static async get(url, isAuth = true) {
    const response = await fetch(url, {
      method: "GET",
      headers: isAuth
        ? {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          }
        : {
            "Content-Type": `application/json`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          },
    });
    return response;
  }
  static async post(url, data, isAuth = true) {
    console.log();
    const response = await fetch(url, {
      method: "POST",
      headers: isAuth
        ? {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          }
        : {
            "Content-Type": `application/json`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          },
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
    return response;
  }
  static async put(url, data, isAuth = true) {
    const response = await fetch(url, {
      method: "PUT",
      headers: isAuth
        ? {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          }
        : {
            "Content-Type": `application/json`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          },
      body: JSON.stringify(data),
    });
    return response;
  }
  static async delete(url, isAuth = true) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: isAuth
        ? {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          }
        : {
            "Content-Type": `application/json`,
            "X-timezone-region":
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            "ngrok-skip-browser-warning": "true",
          },
    });
    return response;
  }
}
