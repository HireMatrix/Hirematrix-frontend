import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";

const PaginationCore = ({
    pageSizeOptions = [10, 25, 50, 100],
    defaultPageSize = 10,
    pageKey,
    pageSizeKey,
    isLocal = true,
    queryFn,
    queryKey,
    enabled
}) => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [totalItems, setTotalItems] = useState(0);

    const [activeSelect, setActiveSelect] = useState(false);

    const changePageSize = (_pageSize) => {
        _pageSize = Number(_pageSize);
        setActiveSelect(false);

        if(_pageSize !== pageSize){
            setPageSize(_pageSize);
            setPage(1);
        }
    }

    const {
        data,
        isLoading,
        isFetched,
        isFetching,
        isError,
        error,
        isLoadingError,
        isRefetching,
        isRefetchError,
        refetch
    } = useQuery({
        queryFn: async () => {
            const response = await queryFn();

            if(isLocal){
                const newTotalItems = response.length;
                if(newTotalItems !== totalItems) setTotalItems(newTotalItems);
            }

            return response;
        },
        queryKey: [...queryKey, page, pageSize],
        enabled: enabled
    });

    const PageSizeSelection = () => {
        
        if(isLoading || !totalItems ){
            return null;
        }

        return (
            <div className="page-size-selction-main-container">
                <span>show</span>
                <div>
                    <button type="button" onClick={() => setActiveSelect(!activeSelect)}>
                        {pageSize} 
                        {activeSelect ? (
                                <span>
                                    <TfiAngleUp/>
                                </span>
                            ) : (
                                <span>
                                    <TfiAngleDown/>
                                </span>
                            )
                        }
                    </button>
                    <ul className={`${activeSelect ? '' : 'hidden'}`}>
                        {
                            pageSizeOptions.map((size) => (
                                <li key={size} onClick={() => changePageSize(size)}>
                                    {size}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    };

    const PageNumberSelection = () => {

        if(isLoading || !totalItems){
            return null;
        }

        // const itemsPerPage = 10;
        const pageCount = Math.ceil(totalItems / pageSize);

        const handlePageClick = (event) => {
          const selectedPage = event.selected + 1;
          setPage(selectedPage);
        };

        return (
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="prev"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
                previousClassName={`${page === 1 ? "disabled" : ""} prev`}
                nextClassName={`${page === pageCount ? "disabled" : ""} next`}
                className="jobs-pagination"
                activeClassName="active-job-pagination"
            />
        )
    };

    return {
        page,
        pageSize,
        totalItems,
        data: isLocal ? data?.slice(
            (page - 1) * pageSize,
            Math.min(data.length, page * pageSize)
        ) : data,
        isLoading,
        isFetching,
        isRefetching,
        isError,
        error,
        isRefetchError,
        refetch,
        changePageSize,
        PageSizeSelection,
        PageNumberSelection,
    }
}

export default PaginationCore
