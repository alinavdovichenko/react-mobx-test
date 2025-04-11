import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../stores/CompanyStore';
import EditOrganizationModal from './EditOrganizationModal';
import RemoveOrganizationModal from './RemoveOrganizationModal';

const Header = observer(() => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const company = companyStore.company;
  const companyId = company?.id;

  const handleSaveName = (newName: string) => {
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

  return (
    <header className="header">
      <button className="header__back">
        <img src="/img/Chevron.svg" alt="Chevron" />
      </button>
      <h1 className="header__title">{company?.name || 'Company name'}</h1>
      <div className="header__actions">
        <button className="header__icon-btn" onClick={() => setEditModalOpen(true)}>
          <img src="/img/Edit.svg" alt="Edit" />
        </button>
        <button className="header__icon-btn" onClick={() => setRemoveModalOpen(true)}>
          <img src="/img/Trash.svg" alt="Trash" />
        </button>
      </div>

      <EditOrganizationModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveName}
        initialName={company?.name || ''}
      />

      <RemoveOrganizationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onConfirm={handleRemoveCompany}
      />
    </header>
  );
});

export default Header;
