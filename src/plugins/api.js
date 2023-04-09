import axios from "axios";

const instance = axios.create({
    baseURL: 'https://flamingo.spb.ru/api'
});

export default instance;
