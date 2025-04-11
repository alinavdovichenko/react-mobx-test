import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { ButtonVariants } from '../type/ButtonVariant';
const EditOrganizationModal = ({ isOpen, onClose, onSave, initialName, }) => {
    const [name, setName] = useState(initialName);
    useEffect(() => {
        setName(initialName);
    }, [initialName]);
    if (!isOpen)
        return null;
    return (_jsx(ModalWrapper, { isOpen: isOpen, onClose: onClose, children: _jsxs("div", { className: "dialog-box", children: [_jsx("h3", { className: "dialog-box__title", children: "Specify the Organization's name" }), _jsx("input", { className: "dialog-box__input", type: "text", value: name, onChange: (e) => setName(e.target.value) }), _jsxs("div", { className: "dialog-box__actions", children: [_jsx("button", { className: `${ButtonVariants.Outline} dialog-box__button`, onClick: onClose, children: "Cancel" }), _jsx("button", { className: `${ButtonVariants.Filled} dialog-box__button`, onClick: () => onSave(name), children: "Save changes" })] })] }) }));
};
export default EditOrganizationModal;
