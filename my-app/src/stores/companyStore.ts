import { makeAutoObservable, runInAction } from "mobx";
import { createAPI } from "../api/api";
import { ApiRoute } from "../api/routes";
import type { CompanyType } from "../type/CompanyType";
import type { ContactType } from "../type/ContactType";

const api = createAPI;

class CompanyStore {
  token = "";
  company: CompanyType | null = null;
  contact: ContactType | null = null;
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  async auth(username: string) {
    try {
      const response = await api.get(`${ApiRoute.Auth}`, {
        params: { user: username },
      });

      const token = response.headers["authorization"];
      if (token) {
        runInAction(() => {
          this.token = token;
          api.defaults.headers.common["Authorization"] = token;
        });
      }
    } catch (e) {
      console.error("Auth error", e);
      runInAction(() => {
        this.error = "Ошибка авторизации";
      });
    }
  }

  async fetchCompany(id: number) {
    this.loading = true;
    try {
      const response = await api.get<CompanyType>(`${ApiRoute.Company}/${id}`);
      runInAction(() => {
        this.company = response.data;
        this.loading = false;
      });
    } catch (e) {
      console.error("fetchCompany error", e);
      runInAction(() => {
        this.error = "Ошибка загрузки данных компании";
        this.loading = false;
      });
    }
  }

  async fetchContact(id: string) {
    try {
      const response = await api.get<ContactType>(`${ApiRoute.Contact}/${id}`);
      runInAction(() => {
        this.contact = response.data;
      });
    } catch (e) {
      console.error("fetchContact error", e);
      runInAction(() => {
        this.error = "Ошибка загрузки контакта";
      });
    }
  }

  async updateCompany(id: number, data: Partial<CompanyType>) {
    try {
      await api.patch(`${ApiRoute.Company}/${id}`, data);
      this.fetchCompany(id);
    } catch (e) {
      console.error("updateCompany error", e);
      runInAction(() => {
        this.error = "Ошибка при обновлении компании";
      });
    }
  }

  async updateContact(id: string, data: Partial<ContactType>) {
    try {
      const response = await api.patch(`${ApiRoute.Contact}/${id}`, data);
      runInAction(() => {
        this.contact = response.data;
      });
      return response.data;
    } catch (e) {
      console.error("updateContact error", e);
      runInAction(() => {
        this.error = "Ошибка при обновлении контакта";
      });
    }
  }

  async uploadImage(companyId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`${ApiRoute.Company}/${companyId}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.fetchCompany(companyId);
    } catch (e) {
      console.error("uploadImage error", e);
      runInAction(() => {
        this.error = "Ошибка загрузки изображения";
      });
    }
  }

  async deleteImage(companyId: number, imageName: string) {
    try {
      await api.delete(`${ApiRoute.Company}/${companyId}/image/${imageName}`);
      this.fetchCompany(companyId);
    } catch (e) {
      console.error("deleteImage error", e);
      runInAction(() => {
        this.error = "Ошибка удаления изображения";
      });
    }
  }

  async deleteCompany(companyId: number) {
    try {
      await api.delete(`${ApiRoute.Company}/${companyId}`);
      runInAction(() => {
        this.company = null;
        this.contact = null;
      });
    } catch (e) {
      console.error("deleteCompany error", e);
      runInAction(() => {
        this.error = "Ошибка при удалении компании";
      });
    }
  }
}

export const companyStore = new CompanyStore();
