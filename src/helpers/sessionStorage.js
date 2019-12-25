export default class StorageService {

    setAuth(key, data) {
        if (data) {
            console.log("DAta: " + data);
            window.sessionStorage.setItem(key, JSON.stringify(data));
        }
    }

    getAuth(key) {
        if (key) {
            return window.sessionStorage.getItem(key);
        }
    }

}