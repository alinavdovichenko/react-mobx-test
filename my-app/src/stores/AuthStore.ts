import { makeAutoObservable } from 'mobx';
import { createAPI } from '../api/api';
import { saveToken } from '../api/token';

const api = createAPI;

export class AuthStore {
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(username: string) {
    const response = await api.get('/auth', {
      params: { user: username },
    });

    const authHeader = response.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]; // убираем "Bearer "
      this.token = token;
      saveToken(token);
    }
  }

  get isAuthenticated() {
    return !!this.token;
  }
}

export const authStore = new AuthStore();
