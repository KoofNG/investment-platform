export default class StorageService {

    setAuth(key, data) {
        if (data) {
            window.sessionStorage.setItem(key, JSON.stringify(data));
        }
    }

    getAuth(key) {
        if (key) {
            return window.sessionStorage.getItem(key);
        }
    }

    getUserId() {
        return JSON.parse(window.sessionStorage.getItem("AUTH_DATA")).user.pk;
    }

    destroySession() {
        return window.sessionStorage.removeItem('AUTH_DATA');
    }

}