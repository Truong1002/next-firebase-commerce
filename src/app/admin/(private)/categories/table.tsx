import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteCategoryById } from "@/features/categories/models";
import { ICategoryDb } from "@/features/categories/type";
import { Pencil } from "lucide-react";
import moment from "moment";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import TableDeleteAction from "./table-delete-action";
interface IProps{
    data: ICategoryDb[];
}


const CategoryTable = ({ data }: IProps) => {
    const onDelete = async (id: string) => {
        "use server"
        await deleteCategoryById(id);
        revalidatePath("/admin/categories")
    }
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Creadted at</TableHead>
                    <TableHead>Edited at</TableHead>
                    <TableHead className="w-28">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell>
                            {moment.unix(category.created_at.seconds).calendar()}
                        </TableCell>
                        <TableCell>
                            {moment.unix(category.updated_at.seconds).calendar()}
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-4">
                                <Link href={"/admin/categories/edit/" + category.id}>
                                    <Pencil className="w-5 h-5"/>
                                </Link>
                                <TableDeleteAction
                                    id={category.id}
                                    deleteCategoryById = {onDelete}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoryTable