"use client";
import React, { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Property, Location } from "./types";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<{
    locations: Location[];
    superhost: boolean;
    bedroom: number | null;
  }>({
    locations: ["all"],
    superhost: false,
    bedroom: null,
  });

  const filteredProperties = properties.filter((property: Property) => {
    const { locations, superhost, bedroom } = filters;
    if (superhost && !property.superhost) return false;
    if (bedroom && property.capacity.bedroom !== bedroom) return false;
    if (locations.includes("all")) return true;
    if (!locations.includes(property.location.toLowerCase() as Location))
      return false;
    return true;
  });

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/property-listing-data.json"
    )
      .then((res) => res.json())
      .then((data: any) => {
        setProperties(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* create a unique filter data */}
      <Filters
        filters={filters}
        onFilterChange={(filters) => {
          setFilters(filters);
        }}
      />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {filteredProperties.map((property) => (
              <div key={property.id}>
                <h2>{property.title}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
