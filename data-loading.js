dropdownOpened = false;
const animals = ["Cats", "Dogs", "Parrots", "Hamsters"];

function getAnimalType(animal) {
    switch (animal) {
        case 1: return "cat";
        case 2: return "dog";
        case 3: return "parrot";
        case 4: return "hamster";
        default: return "undefined";
    }
}

async function fetchPets() {
  const res = await fetch(`${CONFIG.apiUrl}/api/Pets/list`);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.items || []);
  return list;
}
