import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const CustomSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (_jsxs("div", { className: `custom-select ${isOpen ? 'open' : ''}`, ref: ref, children: [_jsxs("div", { className: "custom-select__selected", onClick: () => setIsOpen(!isOpen), children: [value || "Select option", _jsx("img", { src: "/img/Inputs_icon.svg", className: `custom-select__icon ${isOpen ? "open" : ""}`, alt: "Arrow" })] }), _jsx("ul", { className: `custom-select__dropdown ${isOpen ? "open" : ""}`, children: options.map((option) => (_jsx("li", { className: `custom-select__option ${option === value ? "selected" : ""}`, onClick: () => handleSelect(option), children: option }, option))) })] }));
};
export default CustomSelect;
