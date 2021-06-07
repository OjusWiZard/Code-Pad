import axios from 'axios';

const API = axios.create({
    baseUrl: 'http://ojuswireturns.pythonanywhere.com'
})

API.interceptors.request.use(req => {
    if (localStorage.getItem('accessToken')) {
        req.headers.Authorization = `Bearer ${(localStorage.getItem('accessToken'))}`
    }

    return req;
})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


export const signUp = async (formData, history) => {
    try {
        await API.post('/accounts/users/', formData, config);
        history.push('/login');
    } catch (error) {
        console.log('error: ', error.response.data);
    }

}


export const signIn = async (formData, history) => {
    try {
        const { data } = await API.post('/accounts/jwt/create', formData, config);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        history.push('/');
        userInfo();

    } catch (error) {
        console.log("Error: login", error.response.data)
    }
}


export const signOut = (history) => {
    localStorage.clear();
    history.push('/');
}


export const userInfo = async () => {
    try {
        const { data } = await API.get('/accounts/users/me');

        localStorage.setItem('user', JSON.stringify(data));

    } catch (error) {
        console.log("error Login: ", error.response.data);
    }
}


export const editUserInfo = async (formData, history) => {
    try {

        const { data } = await API.patch('/accounts/users/me/', formData, config);
        localStorage.setItem('user', JSON.stringify(data));
        history.push('/')
    } catch (error) {
        console.log("error Edit: ", error.response.data);
    }
}