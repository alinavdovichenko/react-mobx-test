import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { EditIcon, SaveIcon, CancelIcon } from '../Icon';
import { Button } from '../Buttons';
import { ButtonVariants } from '../../type/ButtonVariant';
import CustomSelect from '../CustomSelect';
import CustomMultiSelect from '../CustomMultiSelect';
import { companyStore } from "@/stores/CompanyStore";
import { format, parseISO } from 'date-fns';
const entityOptions = [
    { value: 'sole', label: 'Sole Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llc', label: 'Limited Liability Company' },
];
const companyTypeOptions = [
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
    const [businessEntity, setBusinessEntity] = useState(entityOptions[0]);
    const [companyType, setCompanyType] = useState([]);
    useEffect(() => {
        if (company) {
            setAgreementNo(company.contract.no);
            const isoDate = company.contract.issue_date;
            setAgreementDate(format(parseISO(isoDate), 'yyyy-MM-dd'));
            setDisplayDate(format(parseISO(isoDate), 'dd.MM.yyyy'));
            const entity = entityOptions.find(opt => opt.label === company.businessEntity);
            if (entity)
                setBusinessEntity(entity);
            const matchedTypes = companyTypeOptions.filter(opt => company.type.includes(opt.value));
            setCompanyType(matchedTypes);
        }
    }, [company]);
    const handleSave = () => {
        if (!company)
            return;
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
        if (!company)
            return;
        setIsEditing(false);
        setAgreementNo(company.contract.no);
        const isoDate = company.contract.issue_date;
        setAgreementDate(format(parseISO(isoDate), 'yyyy-MM-dd'));
        setDisplayDate(format(parseISO(isoDate), 'dd.MM.yyyy'));
        const entity = entityOptions.find(opt => opt.label === company.businessEntity);
        if (entity)
            setBusinessEntity(entity);
        const matchedTypes = companyTypeOptions.filter(opt => company.type.includes(opt.value));
        setCompanyType(matchedTypes);
    };
    const handleEntityChange = (label) => {
        const matched = entityOptions.find(opt => opt.label === label);
        if (matched)
            setBusinessEntity(matched);
    };
    const handleCompanyTypeChange = (labels) => {
        const matched = companyTypeOptions.filter(opt => labels.includes(opt.label));
        setCompanyType(matched);
    };
    if (!company)
        return null;
    return (_jsxs("section", { className: "card card--details", children: [_jsxs("div", { className: "card__header", children: [_jsx("h2", { className: "card__title", children: "Company Details" }), isEditing ? (_jsxs("div", { className: "card__edit-actions", children: [_jsx(Button, { Icon: SaveIcon, text: "Save changes", variant: ButtonVariants.Flattened, onClick: handleSave }), _jsx(Button, { Icon: CancelIcon, text: "Cancel", variant: ButtonVariants.Flattened, onClick: handleCancel })] })) : (_jsx(Button, { Icon: EditIcon, text: "Edit", variant: ButtonVariants.Flattened, onClick: () => setIsEditing(true) }))] }), _jsx("div", { className: "card__body", children: isEditing ? (_jsxs("div", { className: "form", children: [_jsxs("div", { className: "form__row", children: [_jsx("label", { className: "form__label", children: "Agreement:" }), _jsx("input", { className: "form__input", type: "text", name: "agreementNumber", value: agreementNo, onChange: e => setAgreementNo(e.target.value) }), _jsx("label", { className: "form__label form__label--auto", children: "Date:" }), _jsx("input", { className: "form__input", type: "date", name: "agreementDate", value: agreementDate, onChange: e => setAgreementDate(e.target.value) })] }), _jsxs("div", { className: "form__row", children: [_jsx("label", { className: "form__label", children: "Business entity:" }), _jsx(CustomSelect, { value: businessEntity.label, onChange: handleEntityChange, options: entityOptions.map(opt => opt.label) })] }), _jsxs("div", { className: "form__row", children: [_jsx("label", { className: "form__label", children: "Company type:" }), _jsx(CustomMultiSelect, { values: companyType.map(opt => opt.label), onChange: handleCompanyTypeChange, options: companyTypeOptions.map(opt => opt.label) })] })] })) : (_jsxs("div", { className: "grid-container", children: [_jsx("div", { className: "grid-item label", children: "Agreement:" }), _jsxs("div", { className: "grid-item value", children: [agreementNo, " ", _jsx("span", { children: "/" }), " ", displayDate] }), _jsx("div", { className: "grid-item label", children: "Business entity:" }), _jsx("div", { className: "grid-item value", children: businessEntity.label }), _jsx("div", { className: "grid-item label", children: "Company type:" }), _jsx("div", { className: "grid-item value", children: companyType.map(opt => opt.label).join(', ') })] })) })] }));
});
export default CompanyDetailsCard;
