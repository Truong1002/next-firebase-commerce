"use client"
import { ConfirmDialog } from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface IProps {
    id: string
    deleteCategoryById: (id:string) => Promise<void>
}

const TableDeleteAction = ({id, deleteCategoryById}: IProps) => {
    const onDelete = async () => {
        try{
            await deleteCategoryById(id);
            toast.info("Deleted category successfully!")
        } catch {
            toast.error("Cannot delete category!")
        }
    }
    return (
        <ConfirmDialog 
            title="Delete this category !"
            description="Do you want to delete this category ?"
            actionTitle="Delete"
            onConfirm={onDelete}
        />
    )
}

export default TableDeleteAction;