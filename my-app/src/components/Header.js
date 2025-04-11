import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from "@/stores/CompanyStore";
import EditOrganizationModal from './EditOrganizationModal';
import RemoveOrganizationModal from './RemoveOrganizationModal';
const Header = observer(() => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
    const company = companyStore.company;
    const companyId = company?.id;
    const handleSaveName = (newName) => {
        if (companyId) {
            companyStore.updateCompany(companyId, { name: newName });
        }
        setEditModalOpen(false);
    };
    const handleRemoveCompany = () => {
        if (companyId) {
            companyStore.deleteCompany(companyId);
        }
        setRemoveModalOpen(false);
    };
    return (_jsxs("header", { className: "header", children: [_jsx("button", { className: "header__back", children: _jsx("img", { src: "/img/Chevron.svg", alt: "Chevron" }) }), _jsx("h1", { className: "header__title", children: company?.name || 'Company name' }), _jsxs("div", { className: "header__actions", children: [_jsx("button", { className: "header__icon-btn", onClick: () => setEditModalOpen(true), children: _jsx("img", { src: "/img/Edit.svg", alt: "Edit" }) }), _jsx("button", { className: "header__icon-btn", onClick: () => setRemoveModalOpen(true), children: _jsx("img", { src: "/img/Trash.svg", alt: "Trash" }) })] }), _jsx(EditOrganizationModal, { isOpen: isEditModalOpen, onClose: () => setEditModalOpen(false), onSave: handleSaveName, initialName: company?.name || '' }), _jsx(RemoveOrganizationModal, { isOpen: isRemoveModalOpen, onClose: () => setRemoveModalOpen(false), onConfirm: handleRemoveCompany })] }));
});
export default Header;
