import { getCategories } from "@/features/categories/models";
import TableHeader from "../../../../components/common/table-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import TableLoading from "../../../../components/common/table-loading";
import CategoryTable from "./table";
import TablePagination from "../../../../components/common/table-pagination";
import { IGetDataInput } from "@/features/type";

interface IProps {
  searchParams: IGetDataInput;
}
const Category = async ({ searchParams }: IProps) => {
  const res = await getCategories({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
  });
  return (
    <div>
      <TableHeader addTitle="Add Category" addPath="/admin/categories/new" />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />}>
            <CategoryTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <div className="text-xs text-muted-foreground mb-1">
            <strong>{res.meta.total}</strong> categories
          </div>
          <TablePagination total={res.meta.total} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;
