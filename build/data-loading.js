import React from 'react';
import { Pet } from './Pet';
import { CONFIG } from './config';
let dropdownOpened = false;
export const animals = ["Cats", "Dogs", "Parrots", "Hamsters"];
export function getAnimalType(animalTypeId) {
    switch (animalTypeId) {
        case 1: return "cat";
        case 2: return "dog";
        case 3: return "parrot";
        case 4: return "hamster";
        default: return "undefined";
    }
}
export function useFetchPets() {
    const [pets, setPets] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        let mounted = true;
        fetch(`${CONFIG.apiUrl}/api/Pets/list`)
            .then(res => {
            if (!res.ok)
                throw new Error("HTTP error " + res.status);
            return res.json();
        })
            .then(data => {
            if (!mounted)
                return;
            const list = Array.isArray(data) ? data : (data.items || data.pets || []);
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
export function useFetchPetInfo() {
    const [petInfo, setPetInfo] = React.useState({});
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        let mounted = true;
        fetch(`${CONFIG.apiUrl}/api/Pets/get-by-id?id=12`)
            .then(res => {
            if (!res.ok)
                throw new Error("HTTP error " + res.status);
            return res.json();
        })
            .then(data => {
            if (!mounted)
                return;
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
// localStorage.setItem("petId", petId);
//${localStorage.getItem("petId")}
//# sourceMappingURL=data-loading.js.map