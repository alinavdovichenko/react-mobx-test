import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
const CustomMultiSelect = ({ options, values, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const toggleOption = (option) => {
        const newValues = values.includes(option)
            ? values.filter(v => v !== option)
            : [...values, option];
        onChange(newValues);
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
    return (_jsxs("div", { className: `custom-select ${isOpen ? 'open' : ''}`, ref: ref, children: [_jsxs("div", { className: "custom-select__selected", onClick: () => setIsOpen(!isOpen), children: [_jsx("span", { children: values.length > 0 ? values.join(', ') : 'Select option' }), _jsx("img", { src: "/img/Inputs_icon.svg", className: `custom-select__icon ${isOpen ? "open" : ""}`, alt: "Arrow" })] }), _jsx("ul", { className: `custom-select__dropdown ${isOpen ? "open" : ""}`, children: options.map(option => (_jsx("li", { className: `custom-select__option ${values.includes(option) ? "selected" : ""}`, children: _jsxs("label", { className: "custom-checkbox", children: [_jsx("input", { type: "checkbox", checked: values.includes(option), onChange: () => toggleOption(option), onClick: e => e.stopPropagation() }), _jsx("span", { className: "checkmark", children: _jsx("img", { src: "/img/Check.svg", alt: "Check", className: "check-icon" }) }), option] }) }, option))) })] }));
};
export default CustomMultiSelect;
