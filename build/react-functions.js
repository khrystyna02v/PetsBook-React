import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { animals } from './data-loading';
import { Pet } from './Pet';
import * as Func from './data-loading';
function Submenu() {
    const listItems = animals.map(a => _jsx("li", { children: a }, a));
    return (_jsx("ul", { id: "submenu-list", children: listItems }));
}
export function Menu() {
    return (_jsxs("section", { id: "menu", children: [_jsx("h1", { children: "Pets book" }), _jsxs("ul", { id: "menu-list", children: [_jsx("li", { children: "Pets Catalog" }), _jsx("li", { children: "By type:" }), _jsx(Submenu, {}), _jsx("li", { children: "Owners" })] })] }));
}
function PetInCatalog({ pet }) {
    return (_jsxs("div", { className: "pet-in-catalog", id: "pet_" + pet.petId, children: [_jsx("img", { src: pet.photoPath || "default.png", onError: (e) => { e.currentTarget.src = "default.png"; }, className: "pet-img", alt: pet.name }), _jsx("h4", { children: pet.name }), _jsx("p", { children: Func.getAnimalType(pet.animalTypeId) })] }));
}
function UploadPetsIntoCatalog() {
    const { pets, error, loading } = Func.useFetchPets();
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    if (!pets.length)
        return _jsx("p", { children: "No pets found" });
    return (_jsx("div", { id: "pets-catalog", children: pets.map((p, idx) => (_jsx(PetInCatalog, { pet: p }))) }));
}
export function PetsCatalog() {
    return (_jsxs("section", { id: "pets-page", children: [_jsx("h2", { children: "Beautiful pets" }), _jsx(UploadPetsIntoCatalog, {})] }));
}
function UploadPetInfo() {
    const { petInfo, error, loading } = Func.useFetchPetInfo();
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    //if (!petInfo.length) return <p>Pet not found.</p>;
    return (_jsxs("div", { id: "pet-info", children: [_jsx("img", { src: petInfo.photoPath || "default.png", onError: (e) => { e.currentTarget.src = "default.png"; }, className: "pet-img", alt: petInfo.name }), _jsxs("p", { children: ["Name: ", petInfo.name] }), _jsxs("p", { children: ["Breed: ", Func.getAnimalType(petInfo.animalTypeId)] }), _jsxs("p", { children: ["Date of birth: ", petInfo.dateOfBirth] }), _jsxs("p", { children: ["Owner: ", petInfo.owner != undefined ? petInfo.owner.name + " " + petInfo.owner.surname : "No owner"] })] }));
}
export function PetInfoSection() {
    return (_jsx("section", { id: "pet-info-page", children: _jsx("div", { id: "pet-info-section", children: _jsx(UploadPetInfo, {}) }) }));
}
//# sourceMappingURL=react-functions.js.map