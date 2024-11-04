"use server"

import { addCategory } from "@/features/categories/models";
import { ICreateCategoryInput } from "@/features/categories/type"

export const onAddCategory = async (data: ICreateCategoryInput) => {
    await addCategory(data);
}

