import axios from 'axios';

const API = axios.create({
    baseUrl: 'http://ojuswireturns.pythonanywhere.com'
})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


export const signUp = async (formData, history) => {
    try {
        const { data } = await API.post('/accounts/users/', formData, config);

        history.push('/login');
    } catch (error) {
        console.log('error: ', error);
    }

}


export const signIn = async (formData, history) => {
    try {
        const { data } = await API.post('/accounts/jwt/create', formData, config);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        history.push('/');
    } catch (error) {
        console.log("Error: ", error.message)
    }
}


export const signOut = (history) => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    history.push('/');
}