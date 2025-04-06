import { useEffect, useRef, useState } from 'react'
import { deleteUserAdmin, fetchAllusersAdmin } from '../Constants/ApiUrls';
import ErrorPage from '../core/ErrorHandler/ErrorPage';
import PaginationCore from '../core/paginationCore/PaginationCore';
import Loader from '../components/Loader';
import { useMemo } from 'react';
import { useCustomeTable } from '../core/TableCore';
import CustomeTableComp from '../core/TableCore/CustomeTableComp';

import { PiSlidersHorizontal } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const userSchema = {
  name: "Name",
  email: "Email",
  userType: "User Type",
  lastLogin: "Last Login",
}

const AdminUsers = () => {

  const [searchValue, setSearchValue] = useState('');
  const [activeSliderView, setActiveSliderView] = useState(false);
  const [activeSliderViewOptions, setActiveSliderViewOptions] = useState([
    "name",
    "email",
    "userType"
  ]);

  const sliderViewRef = useRef();
  const queryClient = useQueryClient();

  const toggleActiveSliderViewOptions = (item) => {
    setActiveSliderViewOptions((prev) => 
      prev.includes(item) ? prev.filter((value) => value != item) : Object.keys(userSchema).filter(key => prev.includes(key) || key === item)
    )
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(sliderViewRef.current && !sliderViewRef.current.contains(event.target)) {
        setActiveSliderView(false);
      }
    }

    if(activeSliderView) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeSliderView])

  const columns = useMemo(
    () => 
      activeSliderViewOptions.map((item) => ({
      Header: userSchema[item],
      accessor: item
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
    queryFn: () => fetchAllusersAdmin(searchValue),
    queryKey: ["adminUsers", searchValue],
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUserAdmin,
    onSuccess: (_, userId) => {
      console.log(`User ${userId} deleted successfully`)
      queryClient.invalidateQueries(["adminUsers"]);
    },
    onError: (error) => {
      console.log("Delete user failed: ", error);
    }
  })

  const tableInstances = useCustomeTable({
    columns: columns,
    data: paginatedData
  })

  if(isLoading || isRefetching || isFetching) {
    return (
      <div className='admin-users-main-container'>
        <Loader/>
      </div>
    )
  }

  if(isError) {
    return <ErrorPage/>
  }

  const handleEditUser = (id) => {
    console.log("user edit", id)
  }

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  }

  return (
    <div className='admin-users-main-container'>
      <div className='admin-container'>
        <div className='admin-users-search-view-container'>
          <div className='admin-users-search-container'>
            <h1>User's List</h1>
            <p>Here's a list of users</p>
            <div>
              <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Filter Users Name'
              />
            </div>
          </div>
          <div className='admin-user-view-container'>
            <div className='sliderView-container' ref={sliderViewRef}>
              <button 
                type='button'
                onClick={() => setActiveSliderView(!activeSliderView)}
              >
                <PiSlidersHorizontal/>
                <span>View</span>
              </button>
              <div className={`${activeSliderView ? '' : 'hidden'}`}>
                {
                  Object.keys(userSchema).map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => toggleActiveSliderViewOptions(item)}
                    >
                      <div>
                        {activeSliderViewOptions.includes(item) ? <TiTick/> : ' '}
                      </div>
                      {userSchema[item]}
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
                  handleEditUser={handleEditUser}
                  handleDeleteUser={handleDeleteUser}
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
    </div>
  )
}

export default AdminUsers
