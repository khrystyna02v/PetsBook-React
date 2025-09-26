import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, PetInfoSection } from './react-functions';
import ReactDOM from 'react-dom/client';
function PetInfoPage() {
    return (_jsxs("div", { id: "full-page", className: "App", children: [_jsx(Menu, {}), _jsx(PetInfoSection, {})] }));
}
const container = document.getElementById('container');
const root = ReactDOM.createRoot(container);
root.render(_jsx(PetInfoPage, {}));
//# sourceMappingURL=PetInfo.js.map