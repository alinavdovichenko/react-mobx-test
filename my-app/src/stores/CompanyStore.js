import { makeAutoObservable, flow } from "mobx";
import { createAPI } from "../api/api";
import { ApiRoute } from "../api/routes";
const api = createAPI;
class CompanyStore {
    constructor() {
        this.token = "";
        this.company = null;
        this.contact = null;
        this.loading = false;
        this.error = "";
        this.auth = flow(function* (username) {
            this.loading = true;
            this.error = "";
            try {
                const response = yield api.get(ApiRoute.Auth, {
                    params: { user: username },
                });
                const token = response.headers["authorization"];
                if (token) {
                    this.token = token;
                    api.defaults.headers.common["Authorization"] = token;
                }
            }
            catch (e) {
                console.error("Auth error", e);
                this.error = "Ошибка авторизации";
            }
            finally {
                this.loading = false;
            }
        });
        this.fetchCompany = flow(function* (id) {
            this.loading = true;
            this.error = "";
            try {
                const response = yield api.get(`${ApiRoute.Company}/${id}`);
                this.company = response.data;
            }
            catch (e) {
                console.error("fetchCompany error", e);
                this.error = "Ошибка загрузки данных компании";
            }
            finally {
                this.loading = false;
            }
        });
        this.fetchContact = flow(function* (id) {
            this.loading = true;
            this.error = "";
            try {
                const response = yield api.get(`${ApiRoute.Contact}/${id}`);
                this.contact = response.data;
            }
            catch (e) {
                console.error("fetchContact error", e);
                this.error = "Ошибка загрузки контакта";
            }
            finally {
                this.loading = false;
            }
        });
        this.updateCompany = flow(function* (id, data) {
            this.loading = true;
            this.error = "";
            try {
                const response = yield api.patch(`${ApiRoute.Company}/${id}`, data);
                this.company = response.data;
                return response.data;
            }
            catch (e) {
                console.error("updateCompany error", e);
                this.error = "Ошибка при обновлении компании";
            }
            finally {
                this.loading = false;
            }
        });
        this.updateContact = flow(function* (id, data) {
            this.loading = true;
            this.error = "";
            try {
                const response = yield api.patch(`${ApiRoute.Contact}/${id}`, data);
                this.contact = response.data;
                return response.data;
            }
            catch (e) {
                console.error("updateContact error", e);
                this.error = "Ошибка при обновлении контакта";
            }
            finally {
                this.loading = false;
            }
        });
        this.uploadImage = flow(function* (companyId, file) {
            this.loading = true;
            this.error = "";
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = yield api.post(`${ApiRoute.Company}/${companyId}/image`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                this.company = response.data;
                return response.data;
            }
            catch (e) {
                console.error("uploadImage error", e);
                this.error = "Ошибка загрузки изображения";
            }
            finally {
                this.loading = false;
            }
        });
        this.deleteImage = flow(function* (companyId, imageName) {
            this.loading = true;
            this.error = "";
            try {
                const response = yield api.delete(`${ApiRoute.Company}/${companyId}/image/${imageName}`);
                this.company = response.data;
                return response.data;
            }
            catch (e) {
                console.error("deleteImage error", e);
                this.error = "Ошибка удаления изображения";
            }
            finally {
                this.loading = false;
            }
        });
        this.deleteCompany = flow(function* (companyId) {
            this.loading = true;
            this.error = "";
            try {
                yield api.delete(`${ApiRoute.Company}/${companyId}`);
                this.company = null;
                this.contact = null;
            }
            catch (e) {
                console.error("deleteCompany error", e);
                this.error = "Ошибка при удалении компании";
            }
            finally {
                this.loading = false;
            }
        });
        makeAutoObservable(this);
    }
}
export const companyStore = new CompanyStore();
