import {
    LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST, CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_RESET
    , FORGET_PASSWORD_FAIL, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
        dispatch({ type: LOGIN_SUCCESS, payload: user.data })
    }
    catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.responce.data.message });
    }
};

export const register = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/register`, userData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.responce.data.message });
    }
};


export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.responce.data.message })
    }
};



export const updateProfile = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/me/update`, userData, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.responce.data.message });
    }
};


export const updatePassword = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.responce.data.message, });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message })
    }
    catch (error) {
        dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.responce.data.message });
    }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message })
    }
    catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.responce.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};