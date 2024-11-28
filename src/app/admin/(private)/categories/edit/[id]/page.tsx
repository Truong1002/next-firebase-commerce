import React from "react";
import EditFormCategory from "./edit-form";
import { getCategoryById } from "@/features/categories/models";
interface IProps {
  params: {
    id: string;
  };
}
const EditCategory = async ({ params }: IProps) => {
  const detailData = await getCategoryById(params.id);
  return detailData && <EditFormCategory data={detailData} id={params.id} />;
};
export default EditCategory;