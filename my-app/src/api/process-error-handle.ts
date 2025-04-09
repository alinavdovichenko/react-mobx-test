import { errorStore } from '../stores/ErrorStore';

export const processErrorHandle = (message: string | null): void => {
  errorStore.setError(message);
  setTimeout(() => errorStore.clearError(), 4000);
};