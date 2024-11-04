import { getCategories } from "@/features/categories/models"
import TableHeader from "./table-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import TableLoading from "./table-loading";
import CategoryTable from "./table";
import TablePagination from "./table-pagination";


const Category = async () => {
  const data = await getCategories();
  return (
    <div>
      <TableHeader />
      <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage your Categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<TableLoading/>}>
              <CategoryTable data = {data}/>
            </Suspense>
          </CardContent>
          <CardFooter className="flex flex-col items-end">
            <div className="text-xs text-muted-foreground mb-1">
                Showing <strong>1-10</strong> of <strong>32</strong> categories
            </div>
            <TablePagination />
          </CardFooter>
      </Card>
    </div>
  )
}

export default Category