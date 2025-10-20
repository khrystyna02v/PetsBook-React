import React from 'react';
import { Person } from '../models/Person';
import { CONFIG } from '../config';

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