import { Pet } from './Pet';
export declare const animals: string[];
export declare function getAnimalType(animalTypeId: number | undefined): string;
export declare function useFetchPets(): {
    pets: Pet[];
    error: string | null;
    loading: boolean;
};
export declare function useFetchPetInfo(): {
    petInfo: Pet;
    error: string | null;
    loading: boolean;
};
//# sourceMappingURL=data-loading.d.ts.map