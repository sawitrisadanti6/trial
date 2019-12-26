class Storage {

    static set(key, value) {

        if(typeof value === 'object'){

            return localStorage.setItem(key, JSON.stringify(value));

        }else{

            return localStorage.setItem(key, value);

        }

    }

    static get(key) {

        let data = localStorage.getItem(key);

        return this.IsJsonString(data) ?  JSON.parse(data) : data;

    }


    static remove(key) {

        return localStorage.removeItem(key);

    }

    static multiRemove(arr_keys){

        return localStorage.multiRemove(arr_keys);

    }

    static clear(){

        return localStorage.clear();

    }

    static IsJsonString(str) {

        try {

            JSON.parse(str);

        } catch (e) {

            return false;

        }

        return true;

    }

}

export default Storage;