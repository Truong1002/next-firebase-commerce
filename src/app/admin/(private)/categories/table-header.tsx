import OrderData from "@/components/common/order-data";
import SearchBar from "@/components/common/search";
import { Button } from "@/components/ui/button";
import {PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
const TableHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className="mr-2">
          <SearchBar />
        </div>
        <OrderData />
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <Link
              href={"/admin/categories/new"}
              className="sr-only sm:not-sr-only sm:white-space-nowrap"
            >
              Add Category
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TableHeader;
