import { useState, useRef, useEffect } from 'react';

type CustomMultiSelectProps = {
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
}

const CustomMultiSelect = ({ options, values, onChange }: CustomMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggleOption = (option: string) => {
    const newValues = values.includes(option)
      ? values.filter(v => v !== option)
      : [...values, option]
    onChange(newValues)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`custom-select ${isOpen ? 'open' : ''}`} ref={ref}>
      <div className="custom-select__selected" onClick={() => setIsOpen(!isOpen)}>
        <span>{values.length > 0 ? values.join(', ') : 'Select option'}</span>
        <img
          src="/img/Inputs_icon.svg"
          className={`custom-select__icon ${isOpen ? "open" : ""}`}
          alt="Arrow"
        />
      </div>

      <ul className={`custom-select__dropdown ${isOpen ? "open" : ""}`}>
        {options.map(option => (
          <li
            key={option}
            className={`custom-select__option ${values.includes(option) ? "selected" : ""}`}
          >
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={values.includes(option)}
                onChange={() => toggleOption(option)}
                onClick={e => e.stopPropagation()}
              />
              <span className="checkmark">
                <img src="/img/Check.svg" alt="Check" className="check-icon" />
              </span>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomMultiSelect;
