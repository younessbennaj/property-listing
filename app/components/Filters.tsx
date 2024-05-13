import { useState } from "react";
import { CheckboxButton } from "./CheckboxButton";

type Location = "all" | "norway" | "finland" | "sweden" | "switzerland";

const locationsValues = [
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

export function Filters({
  filters,
  onFilterChange,
}: {
  filters: {
    locations: Location[];
    superhost: boolean;
    bedroom: number | null;
  };
  onFilterChange: (filters: {
    locations: Location[];
    superhost: boolean;
    bedroom: number | null;
  }) => void;
}) {
  function handleSuperhostChange(e: React.ChangeEvent<HTMLInputElement>) {
    onFilterChange({ ...filters, superhost: e.target.checked });
  }

  function handleBedroomChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    onFilterChange({
      ...filters,
      bedroom: value === "" ? null : Number(value),
    });
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "location") {
      if (e.target.checked) {
        onFilterChange({
          ...filters,
          locations: [...filters.locations, value as Location],
        });
      } else {
        onFilterChange({
          ...filters,
          locations: filters.locations.filter((loc) => loc !== value),
        });
      }
    }
  }

  return (
    <div>
      <form className="flex items-center justify-between gap-6">
        <fieldset className="flex gap-4">
          {locationsValues.map((loc) => (
            <CheckboxButton
              key={loc.value}
              id={loc.value}
              label={loc.name}
              name="location"
              value={loc.value}
              checked={filters.locations.includes(loc.value as Location)}
              onChange={handleCheckboxChange}
            />
          ))}
        </fieldset>
        <fieldset>
          <label>
            <input
              onChange={handleSuperhostChange}
              type="checkbox"
              name="superhost"
              id="superhost"
            />
            Superhost
          </label>
        </fieldset>
        <fieldset>
          <select
            onChange={handleBedroomChange}
            name="bedroom"
            id="type"
            // value={bedroom || ""}
            value={filters.bedroom || ""}
          >
            <option value="" disabled>
              Property type
            </option>
            <option value="">Any bedroom</option>
            <option value="1">1 bedroom</option>
            <option value="2">2 bedroom</option>
          </select>
        </fieldset>
      </form>
    </div>
  );
}
