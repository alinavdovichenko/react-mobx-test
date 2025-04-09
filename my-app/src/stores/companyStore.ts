import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import type { CompanyType } from "../type/CompanyType";
import type { ContactType  } from "../type/ContactType";

const API_URL = "https://test-task-api.allfuneral.com";

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
      const response = await axios.get(`${API_URL}/auth`, {
        params: { user: username },
      });

      runInAction(() => {
        this.token = response.headers["authorization"];
        axios.defaults.headers.common["Authorization"] = this.token;
      });
    } catch (e) {
      console.error("Auth error", e);
      this.error = "Ошибка авторизации";
    }
  }

  async fetchCompany(id: number) {
    this.loading = true;
    try {
      const response = await axios.get<CompanyType>(`${API_URL}/companies/${id}`);
      runInAction(() => {
        this.company = response.data;
        this.loading = false;
      });
    } catch (e) {
      console.error("fetchCompany error", e);
      this.error = "Ошибка загрузки данных компании";
    }
  }

  async fetchContact(id: number) {
    try {
      const response = await axios.get<ContactType>(`${API_URL}/contacts/${id}`);
      runInAction(() => {
        this.contact = response.data;
      });
    } catch (e) {
      console.error("fetchContact error", e);
      this.error = "Ошибка загрузки контакта";
    }
  }

  async updateCompany(id: number, data: Partial<CompanyType>) {
    try {
      await axios.patch(`${API_URL}/companies/${id}`, data);
      this.fetchCompany(id);
    } catch (e) {
      console.error("updateCompany error", e);
      this.error = "Ошибка при обновлении компании";
    }
  }

  async updateContact(id: number, data: Partial<ContactType>) {
    try {
      await axios.patch(`${API_URL}/contacts/${id}`, data);
      this.fetchContact(id);
    } catch (e) {
      console.error("updateContact error", e);
      this.error = "Ошибка при обновлении контакта";
    }
  }

  async uploadImage(companyId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/companies/${companyId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.fetchCompany(companyId);
    } catch (e) {
      console.error("uploadImage error", e);
      this.error = "Ошибка загрузки изображения";
    }
  }

  async deleteImage(companyId: number, imageName: string) {
    try {
      await axios.delete(`${API_URL}/companies/${companyId}/image/${imageName}`);
      this.fetchCompany(companyId);
    } catch (e) {
      console.error("deleteImage error", e);
      this.error = "Ошибка удаления изображения";
    }
  }

  async deleteCompany(companyId: number) {
    try {
      await axios.delete(`${API_URL}/companies/${companyId}`);
      runInAction(() => {
        this.company = null;
        this.contact = null;
      });
    } catch (e) {
      console.error("deleteCompany error", e);
      this.error = "Ошибка при удалении компании";
    }
  }
}

const companyStore = new CompanyStore();
export default companyStore;