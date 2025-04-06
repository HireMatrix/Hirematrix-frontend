import { useState } from "react";
import Loader from '../components/Loader';
import { webScrapingUrlAdmin } from "../Constants/ApiUrls";

const AdminWebScraping = () => {

  const [urlValue, setUrlValue] = useState('');
  const [noUrl, setNoUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendUrl = async() => {
    if(isValidURL(urlValue)){
      setIsLoading(true)
      const response = await webScrapingUrlAdmin(urlValue);
      setIsLoading(false)
    } else {
      setNoUrl(true)
      setIsLoading(false)
    }
  }

  const handleUrlChange = (value) => {
    setNoUrl(false);
    setUrlValue(value);
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
