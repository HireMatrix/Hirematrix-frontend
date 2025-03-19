import React from 'react'

const CustomeTableComp = ({
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow
}) => {
  return (
    <table
        {...getTableProps()}
        className='custome-table-main-container'   
    >
        <thead>
            {headerGroups.map((hg) => {
                const {key, ...rest} = hg.getHeaderGroupProps();

                return(
                    <tr key={key} {...rest}>
                        {
                            hg.headers.map((column) => {
                                const { key: colKey, ...colRest } = column.getHeaderProps();

                                return(
                                    <th key={colKey} {...colRest}>
                                        {
                                            column.render("Header")
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                )
            })}
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map((row) => {
                    prepareRow(row);
                    const { key, ...rest } = row.getRowProps();
                    return (
                        <tr key={key} {...rest}>
                            {
                                row.cells.map((cell) => {
                                    const { key, ...rest } = cell.getCellProps();

                                    return (
                                        <td key={key} {...rest}>
                                            {
                                                cell.render("Cell")
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default CustomeTableComp
