import { PhotoType } from "./PhotoType";

export interface CompanyType {
    id: string;
    contactId: string;
    name: string;
    shortName: string;
    businessEntity: string;
    contract: {
      no: string;
      issue_date: string;
    };
    type: string[];
    status: string;
    photos: PhotoType[];
    createdAt: string;
    updatedAt: string;
  }