import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../lib/data-service";
import { CabinsProps } from "../types";

const CabinList = async ({ filter }: { filter: string }) => {
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let displayedCabins: any;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small") displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium") displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  if (filter === "large") displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    cabins.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabins.map((cabin: CabinsProps) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
};

export default CabinList;
