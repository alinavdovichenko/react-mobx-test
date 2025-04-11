import { makeAutoObservable } from 'mobx';
class ErrorStore {
    constructor() {
        this.error = null;
        makeAutoObservable(this);
    }
    setError(message) {
        this.error = message;
    }
    clearError() {
        this.error = null;
    }
}
export const errorStore = new ErrorStore();
