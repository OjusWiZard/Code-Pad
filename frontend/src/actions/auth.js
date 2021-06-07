import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js'

export const signUp = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, payload: data });

    } catch (error) {
        console.log("ERROR: ", error);
    }
}