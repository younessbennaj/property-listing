"use client";
import React, { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Property, Location } from "./types";
import Image from "next/image";

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
          <div className="flex flex-col gap-[72px]">
            {filteredProperties.map((property) => (
              <div
                className="border border-gray-400 rounded-lg max-w-[335px] mx-auto my-0"
                key={property.id}
              >
                <Image
                  className="w-full h-[200px] object-cover rounded-t-lg"
                  src={property.image}
                  alt=""
                  width={335}
                  height={200}
                />
                <div className="p-5">
                  <h2 className="mb-2 font-semibold">{property.title}</h2>
                  <p className="text-sm text-gray-600">
                    {property.description}
                  </p>
                  <div className="flex">
                    <div className="text-xs text-gray-600">
                      {property.capacity.bedroom} bedroom
                    </div>
                    <div className="text-xs text-gray-600">
                      {property.capacity.people} guests
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl">
                      ${property.price}
                      <span className="text-sm">/night</span>
                    </div>
                    <div className="text-sm">{property.rating}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
