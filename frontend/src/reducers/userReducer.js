import { CLEAR_ERRORS } from "../constants/productConstants";
import {
    LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST,
    LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };


        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return {
                ...state,
            }
            break;

    };
};



export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };


        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return {
                ...state,
            }
            break;

    };
};