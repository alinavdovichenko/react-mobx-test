import { useState } from 'react';
import { EditIcon, SaveIcon, CancelIcon } from '../Icon';
import { Button } from '../Buttons';
import { ButtonVariants } from '../../type/ButtonVariant';
import CustomSelect from '../CustomSelect';
import CustomMultiSelect from '../CustomMultiSelect';

enum CompanyFields {
  AGREEMENT_NUMBER = 'agreementNumber',
  AGREEMENT_DATE = 'agreementDate',
  BUSINESS_ENTITY = 'businessEntity',
  COMPANY_TYPE = 'companyType',
}

const entityOptions = [
  { value: 'sole', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llc', label: 'Limited Liability Company' },
] as const

const companyTypeOptions = [
  { value: 'funeral', label: 'Funeral Home' },
  { value: 'logistics', label: 'Logistics services' },
  { value: 'burial', label: 'Burial care Contractor' },
] as const

type FormDataType = {
  [CompanyFields.AGREEMENT_NUMBER]: string
  [CompanyFields.AGREEMENT_DATE]: string
  [CompanyFields.BUSINESS_ENTITY]: (typeof entityOptions)[number]
  [CompanyFields.COMPANY_TYPE]: (typeof companyTypeOptions)[number][]
}

const initialFormData: FormDataType = {
  [CompanyFields.AGREEMENT_NUMBER]: '1624/2-24',
  [CompanyFields.AGREEMENT_DATE]: '03.12.2024',
  [CompanyFields.BUSINESS_ENTITY]: entityOptions[1],
  [CompanyFields.COMPANY_TYPE]: [companyTypeOptions[0], companyTypeOptions[1]],
}

const CompanyDetailsCard = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<FormDataType>(initialFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEntityChange = (label: string) => {
    const matched = entityOptions.find(opt => opt.label === label)
    if (matched) {
      setFormData(prev => ({ ...prev, [CompanyFields.BUSINESS_ENTITY]: matched }))
    }
  }

  const handleCompanyTypeChange = (labels: string[]) => {
    const matched = companyTypeOptions.filter(opt => labels.includes(opt.label))
    setFormData(prev => ({ ...prev, [CompanyFields.COMPANY_TYPE]: matched }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save logic
  }

  const handleCancel = () => {
    setFormData(initialFormData)
    setIsEditing(false)
  }

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
                name={CompanyFields.AGREEMENT_NUMBER}
                value={formData[CompanyFields.AGREEMENT_NUMBER]}
                onChange={handleInputChange}
              />
              <label className="form__label form__label--auto">Date:</label>
              <input
                className="form__input"
                type="text"
                name={CompanyFields.AGREEMENT_DATE}
                value={formData[CompanyFields.AGREEMENT_DATE]}
                onChange={handleInputChange}
              />
            </div>

            <div className="form__row">
              <label className="form__label">Business entity:</label>
              <CustomSelect
                value={formData[CompanyFields.BUSINESS_ENTITY].label}
                onChange={handleEntityChange}
                options={entityOptions.map(opt => opt.label)}
              />
            </div>

            <div className="form__row">
              <label className="form__label">Company type:</label>
              <CustomMultiSelect
                values={formData[CompanyFields.COMPANY_TYPE].map(opt => opt.label)}
                onChange={handleCompanyTypeChange}
                options={companyTypeOptions.map(opt => opt.label)}
              />
            </div>
          </div>
        ) : (
          <div className="grid-container">
            <div className="grid-item label">Agreement:</div>
            <div className="grid-item value">
              {formData[CompanyFields.AGREEMENT_NUMBER]} <span>/</span> {formData[CompanyFields.AGREEMENT_DATE]}
            </div>

            <div className="grid-item label">Business entity:</div>
            <div className="grid-item value">{formData[CompanyFields.BUSINESS_ENTITY].label}</div>

            <div className="grid-item label">Company type:</div>
            <div className="grid-item value">
              {formData[CompanyFields.COMPANY_TYPE].map(opt => opt.label).join(', ')}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CompanyDetailsCard;
