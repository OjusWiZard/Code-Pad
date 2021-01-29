const { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT, AUTH_ERROR } = require('../actions/auth');

const initialState = {
    user: null,
    loading: true,
    isAuthenticated: null,
    token: localStorage.getItem('token')
};
const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        default:
            return {
                ...state
            }
    }
}
export default authReducer;