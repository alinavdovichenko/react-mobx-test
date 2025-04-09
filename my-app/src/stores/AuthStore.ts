import { makeAutoObservable } from 'mobx';
import { saveToken, dropToken, getToken } from '../api/token';

class AuthStore {
  token: string = getToken();

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    saveToken(token);
  }

  clearToken() {
    this.token = '';
    dropToken();
  }
}

export const authStore = new AuthStore();