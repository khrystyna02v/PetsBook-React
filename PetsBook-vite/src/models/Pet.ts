import { Person } from './Person';
export class Pet {
  petId?: number;
  name?: string;
  animalTypeId?: number;
  animalType?: string;
  photoPath?: string;
  dateOfBirth?: string;
  ownerId?: number;
  owner?: Person | null;
}
