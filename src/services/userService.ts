import {Business} from './businessService';

export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  business: Business | null;
}
