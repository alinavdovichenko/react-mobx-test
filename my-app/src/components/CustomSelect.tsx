import { useState, useRef, useEffect } from "react";

type CustomSelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`custom-select ${isOpen ? 'open' : ''}`} ref={ref}>
      <div className="custom-select__selected" onClick={() => setIsOpen(!isOpen)}>
        {value || "Select option"}
        <img
          src="/img/Inputs_icon.svg"
          className={`custom-select__icon ${isOpen ? "open" : ""}`}
          alt="Arrow"
        />
      </div>

      <ul className={`custom-select__dropdown ${isOpen ? "open" : ""}`}>
        {options.map((option) => (
          <li
            key={option}
            className={`custom-select__option ${option === value ? "selected" : ""}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
