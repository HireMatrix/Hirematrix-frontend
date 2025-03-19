import { useTable } from "react-table"

export const useCustomeTable = ({ columns, data }) => {

    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    })

    return {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        rows,
        prepareRow
    }
}