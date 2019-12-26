import Storage from "./storage";
import { history } from "../shared/configure-store"

class AuthHelper {

    static setLogin = (resp) => {

        Storage.set('access_token', resp.access_token);

        Storage.set('expired_at', resp.expires_in);

    };

    static setProfile = (resp) => {

        Storage.set('profile', resp);

    };

    static getProfile() {

        return Storage.get('profile');

    };

    static logOut() {

        Storage.clear();

        history.push('/login');

    };

    static isLoggedIn() {

        return !!Storage.get('profile');

    };

}

export default AuthHelper;