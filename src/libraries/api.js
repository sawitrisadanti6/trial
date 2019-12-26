import Storage from "./storage";
import Moment from "moment";
import AuthHelper from "./auth-helper";

require('dotenv').config();

class Api {

    static headers(route, params, verb) {

        let headers = {

            'Accept': 'application/json',

            'Content-Type': 'application/json',

        };

        let expression = "(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})";

        let regex = new RegExp(expression);

        if(!route.match(regex)){

            let access_token = Storage.get('access_token');

            if (access_token) {

                access_token = access_token.replace(/['"]+/g, '');

                headers = {

                    'Accept': 'application/json',

                    'Content-Type': 'application/json',

                    'Authorization': `Bearer ${access_token}`,

                    'dataType': 'json',

                };

                return this.xhr(route, params, headers, verb, regex);

            }

        }

        return this.xhr(route,params,headers,verb,regex);

    }

    static headersFile(route, params, verb) {

        let headers = {

            'Accept': 'application/json',

            'Content-Type': 'application/x-www-form-urlencoded',

        };

        let expression = "(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})";

        let regex = new RegExp(expression);

        if(!route.match(regex)){

            let access_token = Storage.get('access_token');

            if (access_token) {

                access_token = access_token.replace(/['"]+/g, '');

                headers = {

                    'Accept': 'application/json',

                    'Content-Type': 'application/x-www-form-urlencoded',

                    'Authorization': `Bearer ${access_token}`,

                };

                return this.xhr(route, params, headers, verb, regex);

            }

        }

        return this.xhr(route,params,headers,verb,regex);

    }

    static refreshToken() {

        let route = '/refreshToken';

        let expression = "(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})";

        let regex = new RegExp(expression);

        let refresh_token = Storage.get('refresh_token');

        refresh_token = refresh_token.replace(/['"]+/g, '');

        let headers = {

            'Accept': 'application/json',

            'Content-Type': 'application/json',

            'Authorization': `Bearer ${refresh_token}`,

            'dataType': 'json',

        };

        return this.xhr(route, null, headers, 'GET', regex);


    }

    static get(route) {

        return this.headers(route, null, 'GET');

    }

    static put(route, params) {

        return this.headers(route, params, 'PUT')

    }

    static putFile(route, params) {
        let expression = "(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})";

        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        delete headers['Content-Type'];
        let access_token = Storage.get('access_token');
        if (access_token) {

            access_token = access_token.replace(/['"]+/g, '');

            headers['Authorization'] = `Bearer ${access_token}`
        }
        const host = process.env.REACT_APP_API_SERVER_URL;
        let arrStatusCode = [401];
        let regex = new RegExp(expression);

        return fetch(`${host}${route}`, {
            headers,
            ...params
        })
            .then( resp => {
                let json = resp.json();

                json = Promise.all([resp.status, json]).then(res => ({
                    ...res[1],
                    statusCode : res[0],
                }));

                if (resp.ok) {

                    return json;

                }

                return json.then(errors => {

                    throw errors

                });
            })
            .then(json => json)

            .catch(errors => {

                if(arrStatusCode.includes(errors.statusCode) &&
                    route !== '/login' &&
                    !route.match(regex)){

                    AuthHelper.logOut();

                }else{

                    throw errors;

                }

            });


    }

    static patch(route, params) {

        return this.headers(route, params, 'PATCH')

    }

    static post(route, params) {

        return this.headers(route, params, 'POST')

    }

    static postFile(route, params) {

        return this.headersFile(route, params, 'POST')

    }

    static delete(route, params) {

        return this.headers(route, params, 'DELETE')

    }

    static xhr(route, params, headers,verb,regex) {

        let arrStatusCode = [401];

        let url = null;

        let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);

        if(!route.match(regex)){

            const host = process.env.REACT_APP_API_SERVER_URL;

            url = `${host}${route}`;

        }else{

            url = route;

        }

        options.headers = headers;

        return fetch(url, options).then(resp => {

            let json = resp.json();

            json = Promise.all([resp.status, json]).then(res => ({
                ...res[1],
                statusCode : res[0],
            }));

            if (resp.ok) {

                return json;

            }

            return json.then(errors => {

                throw errors

            });

        })

            .then(json => json)

            .catch(errors => {

                if(arrStatusCode.includes(errors.statusCode) &&
                    route !== '/login' &&
                    !route.match(regex)){

                    AuthHelper.logOut();

                }else{

                    throw errors;

                }

            });

    }

    static isTokenExpired(){

        let expired_at = Moment.unix(Storage.get('expired_at'));

        let temp_now = Moment().format();

        return Math.sign(expired_at.diff(temp_now)) === -1;

    };

    static checkRefreshToken(){

        if (this.isTokenExpired()) {

            this.refreshToken().then(resp => {

                    AuthHelper.setLogin(resp.data);

                }).catch(err => {

                    console.log(err);

                });
        }

    };

}

export default Api;