import { PropertyLocation } from "../../types";

export type FiltersProps = {
  filters: {
    locations: PropertyLocation[];
    superhost: boolean;
    bedroom: number | null;
  };
  onFilterChange: (filters: {
    locations: PropertyLocation[];
    superhost: boolean;
    bedroom: number | null;
  }) => void;
};
