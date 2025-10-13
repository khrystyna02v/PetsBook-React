import React from 'react';
import { Pet } from '../models/Pet';
import { Person } from '../models/Person';
import { Prediction } from '../models/Prediction';
import { CONFIG } from '../config';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';


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

export function useFetchPetsByType(animalType: number): {pets: Pet[], error: string | null, loading: boolean } {
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!animalType) {
      setPets([]);
      setError(null);
      setLoading(false);
      return;
    }
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/get-all-by-type?typeId=${animalType}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const list: Pet[] = data[0].pets || [];
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
  }, [animalType]);
  return { pets, error, loading };
}

export function useFetchPetsByOwner(ownerId: number): {pets: Pet[], error: string | null, loading: boolean } {
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!ownerId) {
      setPets([]);
      setError(null);
      setLoading(false);
      return;
    }
    
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/get-by-owner-id?id=${ownerId}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const list: Pet[] = data.pets || [];
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
  }, [ownerId]);
  return { pets, error, loading };
}

export function useFetchPetInfo(id: number): {petInfo: Pet | null, error: string | null, loading: boolean} {
  const [petInfo, setPetInfo] = React.useState<Pet | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/get-by-id?id=${id}`)
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
  }, [id]);
  return { petInfo, error, loading };
}

export function useFetchOwnerInfo(name: String, surname: String): {personInfo: Person | null, error: string | null, loading: boolean} {
  const [personInfo, setPersonInfo] = React.useState<Person | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/PhoneBook/details?name=${name}&surname=${surname}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        setPersonInfo(data);
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
  }, [name, surname]);
  return { personInfo, error, loading };
}

export function useFetchPeople(): {people: Person[], error: string | null, loading: boolean } {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/owners-list`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const list: Person[] = Array.isArray(data) ? data : (data.items || data.people || []);
        setPeople(list);
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
  return { people, error, loading };
}

export function useFetchPeopleByBeginning(beginning: string): {people: Person[], error: string | null, loading: boolean } {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!beginning) {
      setPeople([]);
      setError(null);
      setLoading(false);
      return;
    }
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/PhoneBook/beginning?beginning=${beginning}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const unique: Person[] = data.names.concat(data.surnames).filter(
          (person: Person, index: number, self: Person[]) =>
            index === self.findIndex(
              p => p.name === person.name && p.surname === person.surname
            )
        );
        setPeople(unique);
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
  }, [beginning]);
  return { people, error, loading };
}

export function useFetchOriginPredictions(id: number): {predictions: Prediction[], error: string | null, loading: boolean } {
  const [predictions, setPredictions] = React.useState<Prediction[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!id) {
      setPredictions([]);
      setError(null);
      setLoading(false);
      return;
    }
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/CountryPrediction/pedict-country?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        console.log(data);
        setPredictions(data);
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
  }, [id]);
  return { predictions, error, loading };
}

export const handleSubmitPetEdit = async (
  e: FormEvent<HTMLFormElement>,
  petId: number,
  currentPhoto: string,
  navigate: (path: string) => void
): Promise<void> => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fileInput = e.currentTarget.elements.namedItem("photo") as HTMLInputElement | null;
  const selectedFile = fileInput?.files?.[0] ?? null;

  let photoUrl = currentPhoto || "default.png";

  if (selectedFile) {
    const uploadForm = new FormData();
    uploadForm.append("photo", selectedFile);

    const uploadRes = await fetch(`${CONFIG.imageServerUrl}/upload`, {
      method: "POST",
      body: uploadForm
    });

    if (!uploadRes.ok) {
      throw new Error("Upload failed: " + uploadRes.status);
    }

    const uploadData = await uploadRes.json().catch(() => null);
    if (!uploadData || !uploadData.url) {
      throw new Error("Upload response missing 'url'");
    }
    photoUrl = uploadData.url;
  }

  const editedPet = {
    petId: petId,
    name: (formData.get("name") as string) ?? "",
    animalTypeId: Number(formData.get("breed")),
    dateOfBirth: (formData.get("dateOfBirth") as string) ?? "",
    photoPath: photoUrl,
    ownerId: Number(formData.get("ownerId")) || null
  };

  try {
    const response = await fetch(`${CONFIG.apiUrl}/api/Pets/edit?petId=${petId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(editedPet)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error details:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        requestData: editedPet
      });
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    try {
      const data = text ? JSON.parse(text) : { message: "Updating completed" };
      navigate(`/pets/${petId}`);
    } catch (err) {
      console.warn("Response is not JSON, received:", text);
      navigate(`/pets/${petId}`);
    }
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update pet: " + (err instanceof Error ? err.message : String(err)));
  }
};

export const handleSubmitPetCreate = async (
  e: FormEvent<HTMLFormElement>,
  navigate: (path: string) => void
): Promise<void> => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fileInput = e.currentTarget.elements.namedItem("photo") as HTMLInputElement | null;
  const selectedFile = fileInput?.files?.[0] ?? null;

  let photoUrl = "default.png";

  if (selectedFile) {
    const uploadForm = new FormData();
    uploadForm.append("photo", selectedFile);

    const uploadRes = await fetch(`${CONFIG.imageServerUrl}/upload`, {
      method: "POST",
      body: uploadForm
    });

    if (!uploadRes.ok) {
      throw new Error("Upload failed: " + uploadRes.status);
    }

    const uploadData = await uploadRes.json().catch(() => null);
    if (!uploadData || !uploadData.url) {
      throw new Error("Upload response missing 'url'");
    }
    photoUrl = uploadData.url;
  }

  const editedPet = {
    name: (formData.get("name") as string) ?? "",
    animalTypeId: Number(formData.get("breed")),
    dateOfBirth: (formData.get("dateOfBirth") as string) ?? "",
    photoPath: photoUrl,
    ownerId: Number(formData.get("ownerId")) || null
  };

  try {
    const response = await fetch(`${CONFIG.apiUrl}/api/Pets/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(editedPet)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error details:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        requestData: editedPet
      });
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    try {
      const data = text ? JSON.parse(text) : { message: "Creating completed" };
      navigate(`/`);
      alert("Pet created successfully");
    } catch (err) {
      console.warn("Response is not JSON, received:", text);
      navigate(`/`);
      alert("Pet created successfully");
    }
  } catch (err) {
    console.error("Creation failed:", err);
    alert("Failed to create pet: " + (err instanceof Error ? err.message : String(err)));
  }
};

export const handleSubmitPersonEdit = async (
  e: FormEvent<HTMLFormElement>,
  name: string,
  surname: string,
  navigate: (path: string) => void
): Promise<void> => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const editedPerson = {
    name: (formData.get("name") as string) ?? "",
    surname: (formData.get("surname") as string) ?? "",
    phoneNumber: (formData.get("phone") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    dateOfBirth: (formData.get("dateOfBirth") as string) ?? ""
  };

  try {
    const response = await fetch(`${CONFIG.apiUrl}/api/PhoneBook/edit?name=${name}&surname=${surname}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(editedPerson)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error details:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        requestData: editedPerson
      });
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    try {
      const data = text ? JSON.parse(text) : { message: "Updating completed" };
      navigate(`/owners/${editedPerson.name}/${editedPerson.surname}`);
    } catch (err) {
      console.warn("Response is not JSON, received:", text);
      navigate(`/owners/${editedPerson.name}/${editedPerson.surname}`);
    }
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update person: " + (err instanceof Error ? err.message : String(err)));
  }
};

export const handleSubmitPersonCreate = async (
  e: FormEvent<HTMLFormElement>,
  navigate: (path: string) => void
): Promise<void> => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const createdPerson = {
    name: (formData.get("name") as string) ?? "",
    surname: (formData.get("surname") as string) ?? "",
    phoneNumber: (formData.get("phone") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    dateOfBirth: (formData.get("dateOfBirth") as string) ?? ""
  };

  try {
    const response = await fetch(`${CONFIG.apiUrl}/api/PhoneBook/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(createdPerson)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error details:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        requestData: createdPerson
      });
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    try {
      const data = text ? JSON.parse(text) : { message: "Creating completed" };
      navigate(`/owners/${createdPerson.name}/${createdPerson.surname}`);
    } catch (err) {
      console.warn("Response is not JSON, received:", text);
      navigate(`/owners/${createdPerson.name}/${createdPerson.surname}`);
    }
  } catch (err) {
    console.error("Creating failed:", err);
    alert("Failed to create person: " + (err instanceof Error ? err.message : String(err)));
  }
};