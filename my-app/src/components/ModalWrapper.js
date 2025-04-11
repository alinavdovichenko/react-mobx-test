import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
const ModalWrapper = ({ children, isOpen, onClose }) => {
    if (!isOpen)
        return null;
    return ReactDOM.createPortal(_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsx("div", { className: "modal-container", onClick: (e) => e.stopPropagation(), children: children }) }), document.getElementById('modal-root'));
};
export default ModalWrapper;
