import axios from 'axios';

const API = axios.create({
    baseUrl: 'http://ojuswireturns.pythonanywhere.com/'
})



export const signUp = (formData) => API.post('/accounts/users/')