import Image from "next/image";
import { Property } from "../../types";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div
      key={property.id}
      className="rounded-xl w-[358px] border border-gray-600"
    >
      <div className="relative">
        {property.superhost && (
          <div className="absolute top-2 left-2 py-1 px-3 bg-[#20293A] rounded-full text-white text-[10px]">
            Superhost
          </div>
        )}

        <Image
          className="w-full h-[200px] object-cover rounded-t-lg"
          src={property.image}
          alt=""
          width={335}
          height={200}
        />
      </div>

      <div className="p-5 divide-y divide-gray-600">
        <div>
          <h2 className="mb-2 font-semibold text-white">{property.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{property.description}</p>
          <div className="flex gap-4 mb-4">
            <div className="text-xs text-gray-400">
              {property.capacity.bedroom} bedroom
            </div>
            <div className="text-xs text-gray-400">
              {property.capacity.people} guests
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5">
          <div className="text-xl text-white">
            ${property.price}
            <span className="text-sm text-gray-400">/night</span>
          </div>
          <div className="text-sm text-white">{property.rating}</div>
        </div>
      </div>
    </div>
  );
}
