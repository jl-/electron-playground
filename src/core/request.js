import axios from 'axios';
import store from './store';

const request = axios.create({ timeout: 6000 });
request.interceptors.request.use(function(config) {
    const { session } = store.getters.session;
    const token = session && session.token;
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

export default request

