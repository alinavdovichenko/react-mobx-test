import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ModalWrapper from './ModalWrapper';
import { ButtonVariants } from '../type/ButtonVariant';
const RemoveOrganizationModal = ({ isOpen, onClose, onConfirm, }) => {
    if (!isOpen)
        return null;
    return (_jsx(ModalWrapper, { isOpen: isOpen, onClose: onClose, children: _jsxs("div", { className: "dialog-box", children: [_jsx("h3", { className: "dialog-box__title", children: "Remove the Organization?" }), _jsx("p", { className: "dialog-box__text", children: "Are you sure you want to remove this Organization?" }), _jsxs("div", { className: "dialog-box__actions", children: [_jsx("button", { className: `${ButtonVariants.Outline} dialog-box__button`, onClick: onClose, children: "No" }), _jsx("button", { className: `${ButtonVariants.Filled} dialog-box__button`, onClick: onConfirm, children: "Yes, remove" })] })] }) }));
};
export default RemoveOrganizationModal;
