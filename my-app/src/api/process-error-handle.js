import { errorStore } from '../stores/ErrorStore';
export const processErrorHandle = (message) => {
    errorStore.setError(message);
    setTimeout(() => errorStore.clearError(), 4000);
};
