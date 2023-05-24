import './SelectDropdown.css'
function SelectDropdown({ options, value, onChange }) {
  return (
    <select className="dropdown" value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectDropdown;
