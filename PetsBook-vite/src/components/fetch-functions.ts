import React from 'react';
import { Pet } from '../models/Pet';
import { Person } from '../models/Person';
import { Prediction } from '../models/Prediction';
import { CONFIG } from '../config';

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