"use server"

import { editCategoty } from "@/features/categories/models"
import { ICreateCategoryInput } from "@/features/categories/type"


export const onEditCategory = async (
    id: string,
    data: ICreateCategoryInput
) => {
    await editCategoty(id, data)
}