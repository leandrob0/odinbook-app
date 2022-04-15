import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://odinbook-top.herokuapp.com/"
})