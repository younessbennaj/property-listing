import { PropertyLocation } from "@/app/types";
import { CheckboxButton } from "../CheckboxButton/CheckboxButton";
import { LocationFilterProps } from "./types";

const options = [
  {
    name: "All Stays",
    value: "all",
  },
  {
    name: "Norway",
    value: "norway",
  },
  {
    name: "Finland",
    value: "finland",
  },
  {
    name: "Sweden",
    value: "sweden",
  },
  {
    name: "Switzerland",
    value: "switzerland",
  },
];

function LocationFilter({
  filtredLocations,
  onLocationChange,
}: LocationFilterProps) {
  return (
    <div
      className="flex gap-3 flex-wrap justify-center"
      role="group"
      aria-label="Filter properties by location"
    >
      {options.map((option) => (
        <CheckboxButton
          key={option.value}
          id={option.value}
          label={option.name}
          name="location"
          value={option.value}
          checked={filtredLocations.includes(option.value as PropertyLocation)}
          onChange={onLocationChange}
        />
      ))}
    </div>
  );
}

export default LocationFilter;
