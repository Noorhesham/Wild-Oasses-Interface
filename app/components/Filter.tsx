"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  const activeFilter = searchParams.get("capacity") ?? "all";
  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>
        All cabins
      </Button>
      <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>
        2&mdash;3 guests
      </Button>
      <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>
        4&mdash;7 guests
      </Button>
      <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>
        8&mdash;12 guests
      </Button>
    </div>
  );
};

function Button({ filter, handleFilter, activeFilter, children }:{ filter:string, handleFilter:any, activeFilter:String, children:ReactNode }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
