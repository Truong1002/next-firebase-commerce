/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormManager from "../manager-form";
import { ICreateAdminInput } from "@/features/managers/type";
import { onAddAdmin } from "./action";
const CreateCategory = () => {
  const router = useRouter();
  const onSubmit = async ({ email, password }: ICreateAdminInput) => {
    try {
      await onAddAdmin({
        email,
        password,
        isActive: true,
      });
      toast.info("Add manager successfully !");
      router.push("/admin/managers");
    } catch (error:any) {
      const errorMessage = error?.message || "Cannot Add manager!";
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create Manager</h3>
      <FormManager onSubmit={onSubmit} />
    </div>
  );
};
export default CreateCategory;