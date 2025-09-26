export class Pet {
  petId?: number;
  name?: string;
  animalTypeId?: number;
  photoPath?: string;
  dateOfBirth?: string;
  ownerId?: number;
  owner?: {
    personId: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email?: string | null;
    dateOfBirth?: string;
    home?: {
      country?: string;
      city?: string;
      street?: string;
      building?: number;
      apartment?: number;
    };
  };
}
