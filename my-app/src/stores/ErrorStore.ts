import { makeAutoObservable } from 'mobx';

class ErrorStore {
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setError(message: string | null) {
    this.error = message;
  }

  clearError() {
    this.error = null;
  }
}

export const errorStore = new ErrorStore();