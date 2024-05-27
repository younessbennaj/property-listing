import { CheckboxButtonProps } from "./types";

export function CheckboxButton({
  id,
  label,
  name,
  value,
  checked,
  onChange,
}: CheckboxButtonProps) {
  return (
    <label htmlFor={id}>
      <input
        className="peer sr-only"
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="cursor-pointer px-4 py-2 rounded-lg text-sm text-white peer-checked:bg-custom-grey-1 peer-focus-visible:ring peer-focus-visible:ring-blue-400 peer-focus-visible:ring-offset-2">
        {label}
      </div>
    </label>
  );
}
