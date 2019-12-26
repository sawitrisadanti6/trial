import createReducer from "../libraries/create-reducer";

import * as types from './common-types';

let initial_profile_state = {

    id: '',
    email: '',
    fullName: '',
    phone: '',
    firstName: '',
    lastName: '',
    avatar: '',
    lastLogin: '',
    address: '',
    address2: '',
    zipCode: '',
    toggleSidebar: '',

};

export const profile_state = createReducer(initial_profile_state, {

    [types.SET_INITIAL_PROFILE_STATE](state) {

        return {

            id: '',
            email: '',
            fullName: '',
            phone: '',
            firstName: '',
            lastName: '',
            avatar: '',
            lastLogin: '',
            address: '',
            address2: '',
            zipCode: '',

        }

    },

    [types.SET_PROFILE_STATE](state,action) {

        return action.payload

    },

});

let initial_toggle_sidebar_state = false;

export const toggle_sidebar_state = createReducer(initial_toggle_sidebar_state, {

    [types.SET_INITIAL_TOGGLE_SIDEBAR_STATE](state) {

        return false

    },


    [types.SET_SHOW_SIDEBAR](state) {

        return true

    },

    [types.SET_HIDE_SIDEBAR](state) {

        return false

    },

});

let initial_role_state = '';

export const role_state = createReducer(initial_role_state, {

    [types.SET_INITIAL_ROLE_STATE](state) {

        return ''

    },


    [types.SET_ROLE_STATE](state, action) {

        return action.payload

    },

});

let initial_permission_state = '';

export const permission_state = createReducer(initial_permission_state, {

    [types.SET_INITIAL_PERMISSION_STATE](state) {

        return ''

    },


    [types.SET_PERMISSION_STATE](state, action) {

        return action.payload.filter(v =>  v.access).map(v => v.name)

    },

});
