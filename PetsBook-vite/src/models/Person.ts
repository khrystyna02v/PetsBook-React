import { Pet } from './Pet';
export class Person {
  personId?: number;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  animalTypeId?: number;
  email?: string | null;
  dateOfBirth?: string;
  home?: {
    country?: string;
    city?: string;
    street?: string;
    building?: number;
    apartment?: number;
  };
  pets?: Pet[] | null;
}
