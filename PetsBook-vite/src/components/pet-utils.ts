import { CONFIG } from '../config';

export const animals: Record<number, string> = { 1: "cat", 2: "dog", 3: "parrot", 4: "hamster" };

export function getPhotoUrl(photoPath: string | undefined): string {
  if (!photoPath || photoPath === 'default.png') {
    return '/default.png';
  }
  return `${CONFIG.imageServerUrl}${photoPath}`;
}

export function getAnimalType(animalTypeId: number | undefined): string {
  if (animalTypeId === undefined) return "undefined";
  return animals[animalTypeId] || "undefined";
}