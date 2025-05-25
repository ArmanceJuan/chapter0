import { useEffect, useRef, useState } from "react";
// import "../../assets/styles/components/_select.scss";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Select = ({ options, value, onChange, placeholder }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const selectLabel = options.find((option) => option.value === value)?.label;
  return (
    <div className="selector" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="selector__button"
      >
        {selectLabel || placeholder}
      </button>
      {open && (
        <ul className="selector__options">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
