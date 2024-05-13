import classNames from "classnames";

export function CheckboxButton({
  id,
  label,
  name,
  value,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label htmlFor={id}>
      <input
        hidden
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div
        className={classNames("cursor-pointer px-4 py-2 rounded-lg", {
          "bg-blue-600 text-white": checked,
        })}
      >
        {label}
      </div>
    </label>
  );
}
