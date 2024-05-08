"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

type Location = "all" | "norway" | "finland" | "sweden" | "switzerland";
type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  superhost: boolean;
  location: string;
  capacity: {
    people: number;
    bedroom: number;
  };
  image: string;
};

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

function CheckboxButton({
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

export default function Home() {
  /*
    States:
    - 
    - location: string
    - superhost: boolean
    - bedroom: number | null
  */

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [locations, setLocations] = useState<Location[]>(["all"]);
  const [superhost, setSuperhost] = useState<boolean>(false);
  const [bedroom, setBedroom] = useState<number | null>(null);

  const filteredProperties = properties.filter((property: any) => {
    if (superhost && !property.superhost) return false;
    if (bedroom && property.capacity.bedroom !== bedroom) return false;
    if (locations.includes("all")) return true;
    if (!locations.includes(property.location.toLowerCase())) return false;
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

  function handleSuperhostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSuperhost(e.target.checked);
  }

  function handleBedroomChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    if (value === "") return setBedroom(null);
    setBedroom(Number(value));
  }

  return (
    <div>
      {/* filters */}
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
                checked={locations.includes(loc.value as Location)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLocations([...locations, loc.value as Location]);
                  } else {
                    setLocations(
                      locations.filter((l) => l !== (loc.value as Location))
                    );
                  }
                }}
              />
              // <label key={loc.value}>
              //   <input
              //     type="checkbox"
              //     name="location"
              //     value={loc.value}
              //     checked={locations.includes(loc.value as Location)}
              //     onChange={(e) => {
              //       if (e.target.checked) {
              //         setLocations([...locations, loc.value as Location]);
              //       } else {
              //         setLocations(
              //           locations.filter((l) => l !== (loc.value as Location))
              //         );
              //       }
              //     }}
              //   />
              //   {loc.name}
              // </label>
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
              value={bedroom || ""}
            >
              <option value="" disabled selected>
                Property type
              </option>
              <option value="">Any bedroom</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedroom</option>
            </select>
          </fieldset>
        </form>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {filteredProperties.map((property) => (
              <div key={property.id}>
                <h2>{property.title}</h2>
                {/* <p>{property.description}</p>
                <p>{property.price}</p>
                <p>{property.rating}</p>
                <p>{property.superhost ? "Superhost" : "Not Superhost"}</p>
                <p>{property.location}</p>
                <p>{property.capacity.people}</p>
                <p>{property.capacity.bedroom}</p>
                <img src={property.image} alt={property.title} /> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
