
import { CONFIG } from '../config';
import type { FormEvent } from 'react';

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
    alert("Failed to update pet");;
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
    alert("Failed to create pet");
  }
};

export const handleDeletePet = async (
  id: number,
  navigate: (path: string) => void
): Promise<void> => {
  try {
    const res = await fetch(`${CONFIG.apiUrl}/api/Pets/deleting?petId=${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }
    navigate('/');
    alert('Pet deleted successfully');
  } catch (err) {
    console.error("Deleting failed:", err);
    alert("Failed to delete pet");
  }
};