import { PropertyLocation } from "@/app/types";

export type LocationFilterProps = {
  filtredLocations: PropertyLocation[];
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
