import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { EditIcon, SaveIcon, CancelIcon } from '../Icon';
import { Button } from '../Buttons';
import { ButtonVariants } from '../../type/ButtonVariant';
import CustomSelect from '../CustomSelect';
import CustomMultiSelect from '../CustomMultiSelect';
import { companyStore } from '../../stores/CompanyStore';
import { format, parseISO } from 'date-fns';

type Option = { value: string; label: string };

const entityOptions: Option[] = [
  { value: 'sole', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llc', label: 'Limited Liability Company' },
];

const companyTypeOptions: Option[] = [
  { value: 'funeral_home', label: 'Funeral Home' },
  { value: 'logistics_services', label: 'Logistics services' },
  { value: 'burial_care_contractor', label: 'Burial care Contractor' },
];

const CompanyDetailsCard = observer(() => {
  const company = companyStore.company;
  const [isEditing, setIsEditing] = useState(false);

  const [agreementNo, setAgreementNo] = useState('');
  const [agreementDate, setAgreementDate] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [businessEntity, setBusinessEntity] = useState<Option>(entityOptions[0]);
  const [companyType, setCompanyType] = useState<Option[]>([]);

  useEffect(() => {
    if (company) {
      setAgreementNo(company.contract.no);

      const isoDate = company.contract.issue_date;
      setAgreementDate(format(parseISO(isoDate), 'yyyy-MM-dd'));
      setDisplayDate(format(parseISO(isoDate), 'dd.MM.yyyy'));

      const entity = entityOptions.find(opt => opt.label === company.businessEntity);
      if (entity) setBusinessEntity(entity);

      const matchedTypes = companyTypeOptions.filter(opt => company.type.includes(opt.value));
      setCompanyType(matchedTypes);
    }
  }, [company]);

  const handleSave = () => {
    if (!company) return;

    const newDate = format(new Date(agreementDate), 'yyyy-MM-dd');
    const display = format(new Date(agreementDate), 'dd.MM.yyyy');

    companyStore.updateCompany(company.id, {
      contract: {
        no: agreementNo,
        issue_date: newDate,
      },
      businessEntity: businessEntity.label,
      type: companyType.map(opt => opt.value),
    });

    setDisplayDate(display);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!company) return;
    setIsEditing(false);
    setAgreementNo(company.contract.no);

    const isoDate = company.contract.issue_date;
    setAgreementDate(format(parseISO(isoDate), 'yyyy-MM-dd'));
    setDisplayDate(format(parseISO(isoDate), 'dd.MM.yyyy'));

    const entity = entityOptions.find(opt => opt.label === company.businessEntity);
    if (entity) setBusinessEntity(entity);

    const matchedTypes = companyTypeOptions.filter(opt => company.type.includes(opt.value));
    setCompanyType(matchedTypes);
  };

  const handleEntityChange = (label: string) => {
    const matched = entityOptions.find(opt => opt.label === label);
    if (matched) setBusinessEntity(matched);
  };

  const handleCompanyTypeChange = (labels: string[]) => {
    const matched = companyTypeOptions.filter(opt => labels.includes(opt.label));
    setCompanyType(matched);
  };

  if (!company) return null;

  return (
    <section className="card card--details">
      <div className="card__header">
        <h2 className="card__title">Company Details</h2>
        {isEditing ? (
          <div className="card__edit-actions">
            <Button Icon={SaveIcon} text="Save changes" variant={ButtonVariants.Flattened} onClick={handleSave} />
            <Button Icon={CancelIcon} text="Cancel" variant={ButtonVariants.Flattened} onClick={handleCancel} />
          </div>
        ) : (
          <Button Icon={EditIcon} text="Edit" variant={ButtonVariants.Flattened} onClick={() => setIsEditing(true)} />
        )}
      </div>

      <div className="card__body">
        {isEditing ? (
          <div className="form">
            <div className="form__row">
              <label className="form__label">Agreement:</label>
              <input
                className="form__input"
                type="text"
                name="agreementNumber"
                value={agreementNo}
                onChange={e => setAgreementNo(e.target.value)}
              />
              <label className="form__label form__label--auto">Date:</label>
              <input
                className="form__input"
                type="date"
                name="agreementDate"
                value={agreementDate}
                onChange={e => setAgreementDate(e.target.value)}
              />
            </div>

            <div className="form__row">
              <label className="form__label">Business entity:</label>
              <CustomSelect
                value={businessEntity.label}
                onChange={handleEntityChange}
                options={entityOptions.map(opt => opt.label)}
              />
            </div>

            <div className="form__row">
              <label className="form__label">Company type:</label>
              <CustomMultiSelect
                values={companyType.map(opt => opt.label)}
                onChange={handleCompanyTypeChange}
                options={companyTypeOptions.map(opt => opt.label)}
              />
            </div>
          </div>
        ) : (
          <div className="grid-container">
            <div className="grid-item label">Agreement:</div>
            <div className="grid-item value">
              {agreementNo} <span>/</span> {displayDate}
            </div>

            <div className="grid-item label">Business entity:</div>
            <div className="grid-item value">{businessEntity.label}</div>

            <div className="grid-item label">Company type:</div>
            <div className="grid-item value">
              {companyType.map(opt => opt.label).join(', ')}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default CompanyDetailsCard;
