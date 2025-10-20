import { CONFIG } from '../config';

export enum animals{
  cat = 1,
  dog,
  parrot,
  hamster,
  horse
}
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