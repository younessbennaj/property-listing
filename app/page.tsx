"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Filters } from "./components/Filters/Filters";
import { Property, PropertyLocation } from "./types";
import { PropertyCard } from "./components/PropertyCard/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<{
    locations: PropertyLocation[];
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
    if (
      !locations.includes(property.location.toLowerCase() as PropertyLocation)
    )
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
    <div className="bg-[#121826]">
      <div className="relative">
        <div className="relative h-[620px]">
          <Image src="/hero-image.jpg" alt="" layout="fill" objectFit="cover" />
          <div className="absolute top-[180px] left-[140px] w-[620px] h-full">
            <h1 className="text-black text-[64px] font-semibold">
              Peace, nature, dream
            </h1>
            <h2 className="text-2xl">Find and book a great experience.</h2>
          </div>
        </div>
      </div>
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
          <div className="mx-auto my-0 w-fit pb-16">
            {filteredProperties.length === 0 && (
              <h2 className="text-white text-xl mb-8 mt-12">No stays found</h2>
            )}
            {filteredProperties.length !== 0 && (
              <h2 className="text-white text-xl mb-8 mt-12">Over 200 stays</h2>
            )}
            <ul
              aria-label="a property listing"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
