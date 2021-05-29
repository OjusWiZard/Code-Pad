
const initialState = {
    user: null,
    loading: true,
    isAuthenticated: null,
    token: localStorage.getItem('token')
};
const authReducer = (state = initialState, action) => {

}
export default authReducer;