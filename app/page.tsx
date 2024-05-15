"use client";
import React, { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Property, Location } from "./types";
import Image from "next/image";
import { PropertyCard } from "./components/PropertyCard";

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
          <div className="mx-auto my-0 w-fit">
            <h2>Over 200 stays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
