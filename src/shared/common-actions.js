import * as types from './common-types';

export function setInitialProfileState() {

    return {

        type: types.SET_INITIAL_PROFILE_STATE

    }

}

export function setProfileState(data) {

    return {

        type: types.SET_PROFILE_STATE,

        payload: data

    }

}

export const setInitialProfile = () => {

    return (dispatch) => {

        dispatch(setInitialProfileState());

    }

};

export const setProfile = (data) => {

    return (dispatch) => {

        dispatch(setProfileState(data));

    }

};


export function setInitialToggleSidebarState() {

    return {

        type: types.SET_INITIAL_TOGGLE_SIDEBAR_STATE

    }

}

export function showSidebar() {

    return {

        type: types.SET_SHOW_SIDEBAR

    }

}
export function hideSidebar() {

    return {

        type: types.SET_HIDE_SIDEBAR

    }

}

export const setInitialToggleSidebar = () => {

    return (dispatch) => {

        dispatch(setInitialToggleSidebarState());

    }

};

export const setShowSidebar = () => {

    return (dispatch) => {

        dispatch(showSidebar());

    }

};

export const setHideSidebar = () => {

    return (dispatch) => {

        dispatch(hideSidebar());

    }

};


export function setInitialRoleState() {

    return {

        type: types.SET_INITIAL_ROLE_STATE

    }

}

export function setRoleState(data) {

    return {

        type: types.SET_ROLE_STATE,

        payload: data

    }

}

export const setInitialRole = () => {

    return (dispatch) => {

        dispatch(setInitialRoleState());

    }

};

export const setRole = (data) => {

    return (dispatch) => {

        dispatch(setRoleState(data));

    }

};

export function setInitialPermissionState() {

    return {

        type: types.SET_INITIAL_PERMISSION_STATE

    }

}


export function setPermissionState(data) {

    return {

        type: types.SET_PERMISSION_STATE,

        payload: data

    }

}

export const setInitialPermission = () => {

    return (dispatch) => {

        dispatch(setInitialPermissionState());

    }

};

export const setPermission = (data) => {

    return (dispatch) => {

        dispatch(setPermissionState(data));

    }

};
