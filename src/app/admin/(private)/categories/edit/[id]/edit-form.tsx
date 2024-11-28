/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ICreateCategoryInput } from "@/features/categories/type";
import React from "react";
import { toast } from "sonner";
import FormCategory from "../../category-form";
import { onEditCategory } from "./action";
interface IProps {
  data: ICreateCategoryInput;
  id: string;
}
const EditFormCategory = ({ data, id }: IProps) => {
  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onEditCategory(id, {
        name,
        description,
        slug,
      });
      toast.info("Edit category successfully !");
    } catch (error:any) {
      const errorMessage = error?.message || "Cannot edit category!";
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create category</h3>
      <FormCategory onSubmit={onSubmit} data={data} />
    </div>
  );
};
export default EditFormCategory;