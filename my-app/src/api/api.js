import axios from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';
const BACKEND_URL = 'https://test-task-api.allfuneral.com';
const REQUEST_TIMEOUT = 5000;
const StatusCodeMapping = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true,
};
const shouldDisplayError = (response) => !!StatusCodeMapping[response.status];
const createAPI = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
});
createAPI.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
createAPI.interceptors.response.use((response) => response, (error) => {
    if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response?.data?.message ?? 'Неизвестная ошибка');
    }
    throw error;
});
export { createAPI };
