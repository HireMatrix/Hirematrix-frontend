import { useEffect, useMemo, useRef, useState } from 'react';
import { deleteJobAdmin, fetchAllJobsAdmin } from '../Constants/ApiUrls';
import Loader from '../components/Loader';
import ErrorPage from '../core/ErrorHandler/ErrorPage';
import PaginationCore from '../core/paginationCore/PaginationCore';
import { useCustomeTable } from '../core/TableCore';
import CustomeTableComp from '../core/TableCore/CustomeTableComp';
import AddSingleData from '../components/adminComponents/AddSingleData';

import { MdWork } from "react-icons/md";
import { PiSlidersHorizontal } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const jobSchema = {
  title: "Title",
  experience: "Experience",
  salary: "Salary",
  datePosted: "Date Posted",
  highestEducation: "Highest Education",
  workMode: "Work Mode",
  workType: "Work Type",
  workShift: "Work Shift",
  department: "Department",
  englishLevel: "English Level",
  gender: "Gender",
  location: "Location"
};

const AdminJobs = () => {

  const [searchValue, setSearchValue] = useState('');
  const [activeSliderView, setActiveSliderView] = useState(false);
  const [activeAddJob, setActiveAddJob] = useState(false);
  const [activeSliderViewOptions, setActiveSliderViewOptions] = useState([
    "title",
    "experience",
    "salary",
    "datePosted",
    "workMode"
  ]);
  const sliderViewRef = useRef(null);
  const queryClient = useQueryClient();

  const toggleActiveSliderViewOptions = (item) => {
    setActiveSliderViewOptions((prev) => 
      prev.includes(item) ? 
        prev.filter((value) => value != item) 
      : Object.keys(jobSchema).filter(key => prev.includes(key) || key === item)
    )
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sliderViewRef.current && !sliderViewRef.current.contains(event.target)
      ) {
        setActiveSliderView(false);
      }
    };
  
    if (activeSliderView) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSliderView]);
  

  const handleCloseAddJob = () => {
    setActiveAddJob(false);
  }
       
  const columns = useMemo(
    () => 
      activeSliderViewOptions.map((item) => ({
        Header: jobSchema[item], 
        accessor: item,
      })), 
    [activeSliderViewOptions]
  );

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
    queryFn: () => fetchAllJobsAdmin(searchValue),
    queryKey: ["adminJobs", searchValue],
  });

  const deleteJobMutation = useMutation({
    mutationFn: deleteJobAdmin,
    onSuccess: (_, jobId) => {
      console.log(`Job ${jobId} deleted successfully`)
      queryClient.invalidateQueries(["adminJobs"]);
    },
    onError: (error) => {
      console.log("Delete job failed: ", error);
    }
  })

  const tableInstances = useCustomeTable({
    columns: columns,
    data: paginatedData
  })

  if(isLoading || isRefetching || isFetching) {
    return <Loader/>
  }

  if(isError) {
    return <ErrorPage/>
  }

  const handleEditJob = (id) => {
    console.log("Edit job: ", id)
  }

  const handleDeleteJob = (id) => {
    if(window.confirm("Are you sure you want to delete this job?")) {
      deleteJobMutation.mutate(id);
    }
  }

  return (
    <div 
      className={`admin-jobs-main-container`}
    >
      <div className='admin-container'>
        <div className='admin-jobs-search-view-container'>
          <div className='admin-job-serach-container'>
            <h1>Jobs List</h1>
            <p>Here's a list of jobs that are on the page</p>
            <div>
              <input
                type= 'text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Filter Jobs Title...'
              />
            </div>
          </div>
          <div className='admin-add-job-view-columns-container'>
            <div>
              <button type='button' onClick={() => setActiveAddJob(!activeAddJob)}>
                <span>Add Job</span>
                <MdWork/>
              </button>
            </div>
            <div className='sliderView-container' ref={sliderViewRef}>
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
            )
          }
        </div>
      </div>
      {
        activeAddJob && (
          <AddSingleData handleCloseAddJob={handleCloseAddJob}/>
        )
      }
    </div>
  )
}

export default AdminJobs
