import { Field, Label, Select, Switch } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LocationFilter from "../LocationFilter/LocationFilter";
import { PropertyLocation } from "../../types";
import { FiltersProps } from "./types";

export function Filters({ filters, onFilterChange }: FiltersProps) {
  function handleSuperhostChange(checked: boolean) {
    onFilterChange({ ...filters, superhost: checked });
  }

  function handleBedroomChange(value: string) {
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
          locations: [...filters.locations, value as PropertyLocation],
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
    <div className="bg-[#20293A] px-10 py-8 rounded-xl mx-[72px] translate-y-[-50%]">
      <form className="flex items-center justify-between gap-6 flex-wrap">
        <LocationFilter
          filtredLocations={filters.locations}
          onLocationChange={handleCheckboxChange}
        />
        <Field className="flex items-center gap-2">
          <Switch
            checked={filters.superhost}
            onChange={handleSuperhostChange}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 data-[checked]:bg-blue-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white "
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
          </Switch>
          <Label className="text-sm text-white">Superhost</Label>
        </Field>
        <fieldset>
          <div className="relative">
            <Select
              className="bg-transparent appearance-none px-6 py-4 pr-[58px] rounded-lg text-sm text-white border border-[#4A5567] cursor-pointer"
              name="status"
              aria-label="Project status"
              onChange={(e) => handleBedroomChange(e.target.value)}
            >
              <option value="0">Any bedroom</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-[14px] right-[24px] size-6 fill-white"
              aria-hidden="true"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
