
import { CONFIG } from '../config';
import type { FormEvent } from 'react';

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
    alert("Failed to edit person");
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
    alert("Failed to create person");;
  }
};

export const handleDeletePerson = async (
  name: string, 
  surname: string,
  navigate: (path: string) => void
): Promise<void> => {
  try {
    const res = await fetch(`${CONFIG.apiUrl}/api/PhoneBook/deleting?name=${name}&surname=${surname}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }
    navigate('/owners');
    alert('Person deleted successfully');
  } catch (err) {
    console.error("Deleting failed:", err);
    alert("Failed to delete person");
  }
};