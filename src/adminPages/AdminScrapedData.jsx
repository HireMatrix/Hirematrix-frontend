import React from 'react'
import PaginationCore from '../core/paginationCore/PaginationCore';
import { fetchAllscrapedJobDataAdmin } from '../Constants/ApiUrls';

const AdminScrapedData = () => {

    const {
        data: paginatedData = [],
        page,
        pageSize,
        PageNumberSelection,
        PageSizeSelection,
        totalItems,
        isLoading,
        isFetching,
        isError,
        error,
        isRefetching,
        refetch,
    } = PaginationCore({
        queryFn: () => fetchAllscrapedJobDataAdmin(),
        queryKey: ["scrapedJobData"],
    });

    console.log(paginatedData)

  return (
    <div>
      Admin scraped data
    </div>
  )
}

export default AdminScrapedData
