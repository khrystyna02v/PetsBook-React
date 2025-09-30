import React from 'react';
import { Pet } from './Pet';
import { CONFIG } from './config';
import type { FormEvent } from 'react';

export const animals: Record<number, string> = { 1: "cat", 2: "dog", 3: "parrot", 4: "hamster" };

export function getAnimalType(animalTypeId: number | undefined): string {
  if (animalTypeId === undefined) return "undefined";
  return animals[animalTypeId] || "undefined";
}

export function useFetchPets(): {pets: Pet[], error: string | null, loading: boolean } {
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/list`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const list: Pet[] = Array.isArray(data) ? data : (data.items || data.pets || []);
        setPets(list);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (mounted) {
          setError(err.message || "Fetch error");
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);
  return { pets, error, loading };
}

export function useFetchPetInfo(): {petInfo:Pet, error: string | null, loading: boolean} {
  const [petInfo, setPetInfo] = React.useState<Pet>({} as Pet);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/get-by-id?id=${localStorage.getItem("petId")}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        setPetInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (mounted) {
          setError(err.message || "Fetch error");
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);
  return { petInfo, error, loading };
}

export const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const selectedFile = (e.currentTarget.elements.namedItem('photo') as HTMLInputElement).files?.[0];
  let photoUrl = localStorage.getItem("animalPhoto") || "default.png";

  if (selectedFile) {
    const formData = new FormData();
    formData.append("photo", selectedFile);

    const uploadRes = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    });

    if (!uploadRes.ok) throw new Error("Upload failed");
    const uploadData = await uploadRes.json();
    photoUrl = uploadData.url;
  }

  const editedPet = {
  name: formData.get("name") as string,
  animalTypeId: Number(formData.get("breed")),
  dateOfBirth: formData.get("dateOfBirth") as string,
  ownerId: localStorage.getItem("ownerId") ? Number(localStorage.getItem("ownerId")) : undefined,
  photoPath: photoUrl
  };

    console.log(editedPet);
    try {
      const response = await fetch(`${CONFIG.apiUrl}/api/Pets/edit?petId=${localStorage.getItem("petId")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPet)
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const text = await response.text();
      try {
        const data = text ? JSON.parse(text) : { message: "Updating completed" };
        console.log(data);
      } catch (e) {
        console.warn("Edit response is not JSON, received:", text);
      }

      window.location.href = "pet-info.html";
      
    } catch (err) {
      console.error("Update failed:", err);
    }
  };