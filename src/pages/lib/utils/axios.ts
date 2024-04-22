import * as Axios from 'axios';
import fetchAdapter from '@haverstack/axios-fetch-adapter';

const axios = Axios.default.create({
    adapter: fetchAdapter,
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

export default axios;
