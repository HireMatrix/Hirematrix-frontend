import { useState } from "react";
import { useLocation } from "react-router-dom";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const actionConfig = {
    jobs: [
        { label: "Edit", action: "editJob", icon: <MdEdit/> },
        { label: "Delete", action: "deleteJob", icon: <MdDelete/> }
    ],
    users: [
        { label: "Edit", action: "editUser", icon: <MdEdit/> },
        { label: "Delete", action: "deleteUser", icon: <MdDelete/> }
    ],
    blogs: [
        { label: "Edit", action: "editBlog", icon: <MdEdit/> },
        { label: "Delete", action: "deleteBlog", icon: <MdDelete/> }
    ],
}

const CustomeTableComp = ({
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    handleEditUser,
    handleDeleteUser,
    handleEditJob,
    handleDeleteJob,
    handleEditBlog,
    handleDeleteBlog
}) => {

    const location = useLocation();
    const [openDropDown, setOpenDropDown] = useState(null);

    const determineType = () => {
        if(location.pathname.includes('/jobs')) return "jobs";
        if(location.pathname.includes('/users')) return "users";
        if(location.pathname.includes('/blogs')) return "blogs";
    }

    const dataType = determineType();

    const handleToggleDropDown = (e, index) => {
        e.stopPropagation();
        setOpenDropDown((prev) => (prev === index ? null : index))
    }

    const handleAction = (action, id) => {
        switch (action) {
            case "editJob":
                handleEditJob(id);
                break;
            case "deleteJob":
                handleDeleteJob(id);
                break;
            case "editUser":
                handleEditUser(id);
                break;
            case "deleteUser":
                handleDeleteUser(id);
                break;
            case "editBlog":
                handleEditBlog(id);
                break;
            case "deleteBlog":
                handleDeleteBlog(id);
                break;
            default:
                break;
        }
    }

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
                  rows.map((row, rowIndex) => {
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
                            <td className={`edit-content-dropDown`}>
                                <div className="drop-down-main-container">
                                <div className='drop-down-icon' onClick={(e) => handleToggleDropDown(e, rowIndex)}>
                                    <HiOutlineDotsHorizontal/>
                                </div>
                                {
                                    openDropDown === rowIndex && dataType && (
                                        <div className="drop-down-card">
                                            {
                                                actionConfig[dataType].map((item, index) => (
                                                    <div key={index} onClick={() => handleAction(item.action, row.original._id)}>
                                                        <button>{item.icon}{item.label}</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                </div>
                            </td>
                        </tr>
                    )
                  })
              }
          </tbody>
      </table>
    )
}

export default CustomeTableComp
