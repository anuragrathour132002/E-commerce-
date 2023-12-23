import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST, CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST } from "../constants/userConstants";
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



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};