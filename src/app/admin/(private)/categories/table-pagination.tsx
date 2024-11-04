import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const TablePagination = () => {
    return(
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#"/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <Pagination>
                    <PaginationEllipsis/>
                </Pagination>
                <PaginationItem>
                    <PaginationNext href="#"/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default TablePagination