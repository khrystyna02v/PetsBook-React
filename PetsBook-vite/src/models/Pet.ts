import { Person } from './Person';
export class Pet {
  petId?: number;
  name?: string;
  animalTypeId?: number;
  photoPath?: string;
  dateOfBirth?: string;
  ownerId?: number;
  owner?: Person | null;
}
