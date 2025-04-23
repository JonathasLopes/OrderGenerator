import axios, { AxiosError } from "axios";

export const api = Axios();

function Axios() {
    const token = import.meta.env.VITE_AUTH;

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3333/api",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.request.use(request => {
        if(token) {
            request.headers.Authorization = `Basic ${token}`
        }

        return request;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    });

    return api;
}

export default Axios;