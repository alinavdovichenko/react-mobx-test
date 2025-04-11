import { makeAutoObservable, flow } from "mobx";
import { createAPI } from "../api/api";
import { ApiRoute } from "../api/routes";
import type { CompanyType } from "../type/CompanyType";
import type { ContactType } from "../type/ContactType";
import type { AxiosResponse } from "axios";

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

  auth = flow(function* (this: CompanyStore, username: string) {
    this.loading = true;
    this.error = "";
    try {
      const response: AxiosResponse = yield api.get(ApiRoute.Auth, {
        params: { user: username },
      });
      const token = response.headers["authorization"];
      if (token) {
        this.token = token;
        api.defaults.headers.common["Authorization"] = token;
      }
    } catch (e) {
      console.error("Auth error", e);
      this.error = "Ошибка авторизации";
    } finally {
      this.loading = false;
    }
  });

  fetchCompany = flow(function* (this: CompanyStore, id: string) {
    this.loading = true;
    this.error = "";
    try {
      const response: AxiosResponse<CompanyType> = yield api.get(`${ApiRoute.Company}/${id}`);
      this.company = response.data;
    } catch (e) {
      console.error("fetchCompany error", e);
      this.error = "Ошибка загрузки данных компании";
    } finally {
      this.loading = false;
    }
  });

  fetchContact = flow(function* (this: CompanyStore, id: string) {
    this.loading = true;
    this.error = "";
    try {
      const response: AxiosResponse<ContactType> = yield api.get(`${ApiRoute.Contact}/${id}`);
      this.contact = response.data;
    } catch (e) {
      console.error("fetchContact error", e);
      this.error = "Ошибка загрузки контакта";
    } finally {
      this.loading = false;
    }
  });

  updateCompany = flow(function* (
    this: CompanyStore,
    id: string,
    data: Partial<CompanyType>
  ) {
    this.loading = true;
    this.error = "";
    try {
      const response: AxiosResponse<CompanyType> = yield api.patch(`${ApiRoute.Company}/${id}`, data);
      this.company = response.data;
      return response.data;
    } catch (e) {
      console.error("updateCompany error", e);
      this.error = "Ошибка при обновлении компании";
    } finally {
      this.loading = false;
    }
  });

  updateContact = flow(function* (
    this: CompanyStore,
    id: string,
    data: Partial<ContactType>
  ) {
    this.loading = true;
    this.error = "";
    try {
      const response: AxiosResponse<ContactType> = yield api.patch(`${ApiRoute.Contact}/${id}`, data);
      this.contact = response.data;
      return response.data;
    } catch (e) {
      console.error("updateContact error", e);
      this.error = "Ошибка при обновлении контакта";
    } finally {
      this.loading = false;
    }
  });

  uploadImage = flow(function* (
    this: CompanyStore,
    companyId: string,
    file: File
  ) {
    this.loading = true;
    this.error = "";
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response: AxiosResponse<CompanyType> = yield api.post(
        `${ApiRoute.Company}/${companyId}/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      this.company = response.data;
      return response.data;
    } catch (e) {
      console.error("uploadImage error", e);
      this.error = "Ошибка загрузки изображения";
    } finally {
      this.loading = false;
    }
  });

  deleteImage = flow(function* (
    this: CompanyStore,
    companyId: string,
    imageName: string
  ) {
    this.loading = true;
    this.error = "";
    try {
      const response: AxiosResponse<CompanyType> = yield api.delete(
        `${ApiRoute.Company}/${companyId}/image/${imageName}`
      );
      this.company = response.data;
      return response.data;
    } catch (e) {
      console.error("deleteImage error", e);
      this.error = "Ошибка удаления изображения";
    } finally {
      this.loading = false;
    }
  });

  deleteCompany = flow(function* (this: CompanyStore, companyId: string) {
    this.loading = true;
    this.error = "";
    try {
      yield api.delete(`${ApiRoute.Company}/${companyId}`);
      this.company = null;
      this.contact = null;
    } catch (e) {
      console.error("deleteCompany error", e);
      this.error = "Ошибка при удалении компании";
    } finally {
      this.loading = false;
    }
  });
}

export const companyStore = new CompanyStore();
