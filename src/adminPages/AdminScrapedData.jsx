import React, { useMemo, useRef, useState } from 'react'
import PaginationCore from '../core/paginationCore/PaginationCore';
import { fetchAllscrapedJobDataAdmin } from '../Constants/ApiUrls';

import { MdWork } from "react-icons/md";
import { PiSlidersHorizontal } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import CustomeTableComp from '../core/TableCore/CustomeTableComp';
import { useCustomeTable } from '../core/TableCore';

const jobSchema = {
  title: "Title",
  experience: "Experience",
  salary: "Salary",
  highestEducation: "Highest Education",
  workMode: "Work Mode",
  workType: "Work Type",
  workShift: "Work Shift",
  department: "Department",
  englishLevel: "English Level",
  gender: "Gender",
  location: "Location"
};

const AdminScrapedData = () => {

  const [activeSliderView, setActiveSliderView] = useState(false)
  const [activeAddJob, setActiveAddJob] = useState(false)
  const [activeSliderViewOptions, setActiveSliderViewOptions] = useState([
    "title",
    "experience",
    "salary",
    "workMode"
  ])

  const columns = useMemo(
    () => 
      activeSliderViewOptions.map((item) => ({
        Header: jobSchema[item],
        accessor: item
      })),
    [activeSliderViewOptions]
  )

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

  console.log(paginatedData);

  const tableInstances = useCustomeTable({
    columns: columns,
    data: paginatedData
  })

  const handleEditJob = () => {}

  const handleDeleteJob = () => {}

  const toggleActiveSliderViewOptions = (item) => {
    setActiveSliderViewOptions((prev) => 
      prev.includes(item) ? 
        prev.filter((value) => value != item) 
      : Object.keys(jobSchema).filter(key => prev.includes(key) || key === item)
    )
  }

  return (
    <div
      className={`admin-jobs-main-container`}
    >
      <div className='admin-container'>
        <div className='admin-jobs-search-view-container'>
          <div className='admin-job-serach-container'>
            <h1>Scraped Jobs</h1>
            <p>
              {`Here's a list of jobs that are scraped now (ready to upload to the database)`} 
            </p>
          </div>
          <div className='admin-add-job-view-columns-container'>
            <div>
              <button type='button' onClick={() => setActiveAddJob(!activeAddJob)}>
                <span>Upload</span>
                <MdWork/>
              </button>
            </div>
            <div className='sliderView-container'>
              <button type='button' onClick={() => setActiveSliderView(!activeSliderView)}>
                <PiSlidersHorizontal/>
                <span>View</span>
              </button>
              <div className={`${activeSliderView ? '' : 'hidden'}`}>
                {
                  Object.keys(jobSchema).map((item, index) => (
                    <div key={index} onClick={() => toggleActiveSliderViewOptions(item)}>
                      <div>{activeSliderViewOptions.includes(item) ? <TiTick/> : ' '}</div>
                      {jobSchema[item]}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className='admin-table-wrap-main-container'>
          {
            !paginatedData ? (
              <Loader/>
            ) : (
              paginatedData.length > 0 ? (
                <>
                  <CustomeTableComp
                    {...tableInstances}
                    handleEditJob={handleEditJob}
                    handleDeleteJob={handleDeleteJob}
                  />
                  <div>
                    <PageSizeSelection/>
                    <PageNumberSelection/>
                  </div>
                </>
              ) : (
                <p>No jobs to show</p>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AdminScrapedData
