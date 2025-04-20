import { useMemo, useState } from "react";
import Loader from '../components/Loader';
import { webScrapingUrlAdmin } from "../Constants/ApiUrls";
import { useCustomeTable } from '../core/TableCore';
import PaginationCore from '../core/paginationCore/PaginationCore';
import CustomeTableComp from '../core/TableCore/CustomeTableComp';

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
  location: "Location",
  // description: "Description"
};

const AdminWebScraping = () => {

  const [urlValue, setUrlValue] = useState('https://apna.co/jobs');
  const [noUrl, setNoUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSliderView, setActiveSliderView] = useState(false);
  const [activeSliderViewOptions, setActiveSliderViewOptions] = useState([
    "title",
    "experience",
    "salary",
    "workMode",
    "department"
  ])

  const columns = useMemo(
    () => 
      activeSliderViewOptions.map((item) => ({
        Header: jobSchema[item], 
        accessor: item,
      })), 
    [activeSliderViewOptions]
  );

  const isValidURL = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' +
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +
      '(\\#[-a-zA-Z\\d_]*)?$','i'
    );
    return !!urlPattern.test(url) && (url.startsWith('http://') || url.startsWith('https://'));
  };

  const handleUrlChange = (value) => {
    setNoUrl(false);
    setUrlValue(value);
  }

  const {
    data: paginatedData = [],
    page,
    pageSize,
    PageNumberSelection,
    PageSizeSelection,
    totalItems,
    isFetching,
    isError,
    error,
    isRefetching,
    refetch,
  } = PaginationCore({
    queryFn: () => webScrapingUrlAdmin(urlValue),
    queryKey: ["adminWebScraping"],
    enabled: false
  });

  const handleSendUrl = async() => {
    if(isValidURL(urlValue)){
      setIsLoading(true)
      // const response = await webScrapingUrlAdmin(urlValue);
      // console.log(response.jobs)
      await refetch();
      setIsLoading(false)
    } else {
      setNoUrl(true)
      setIsLoading(false)
    }
  }

  if(isLoading) {
    return (
      <div className='admin-webscraping-main-container'>
        <div className='admin-container'>
          <Loader/>
        </div>
      </div>
    )
  }

  return (
    <div className='admin-webscraping-main-container'>
      <div className='admin-container'>
        <div className="admin-scraping-input-container">
          <h1>Web Scraping</h1>
          <p>Enter a Url which will have the Jobs data in it.</p>
          <div>
            <input
              type="text"
              placeholder="Enter a url, e.g. https://www.example.com"
              value={urlValue}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            <button onClick={handleSendUrl}>
              Send
            </button>
          </div>
          {
            noUrl && (<p>*Please insert a working url</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default AdminWebScraping
