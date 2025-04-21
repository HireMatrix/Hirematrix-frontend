import React from 'react'

const JobItem = () => {
  return (
    <div className='apply-job-section-main-container'>
        <div className="applyjob-section-container">
            <div className="applyjob-main-container">
                <div className="applyjob-sub-container1">
                    <img src="/src/assets/JobItem/companys-icon.png"
                    className="companys-icon1"/>
                    <div className="applyjob-sub-container2">
                        <h1>Front-end Developer(react.js)</h1>
                        <p>kotammal Thunai Saanvi Structural Slon Private Limited</p>
                    </div>
                </div>
                <div className="applyjob-sub-container3">
                    <img src="/src/assets/JobItem/location-icon.png"
                    className="location-icon"/>
                    <p>Begumpet, Hyderabad</p>
                </div>
                <div className="applyjob-sub-container3">
                    <img src="/src/assets/JobItem/money-icon.png"
                    className="money-icon"/>
                    <p>₹35,000 -₹53,000 monthly</p>
                </div>
                <div className="applyjob-sub-container4">
                    <div className="applyjob-sub-container4-1">
                        <h1>Fixed</h1>
                        <p>₹12,000 -₹18,000</p>
                    </div>
                    <div className="applyjob-sub-container4-1">
                        <h1>Earning Potential</h1>
                        <p>₹18,000</p>
                    </div>
                </div>
                <div className="applyjob-sub-container5">
                    <div className="applyjob-sub-container5-1">
                        <img src="/src/assets/JobItem/company-icon2.png"
                        className="small-icons"/>
                        <p>Work From Office</p>
                    </div>
                    <div className="applyjob-sub-container5-1">
                        <img src="/src/assets/JobItem/emp-time-icon.png"
                        className="small-icons"/>
                        <p>Full Time</p>
                    </div>
                    <div className="applyjob-sub-container5-1">
                        <img src="/src/assets/JobItem/exp-icon.png"
                        className="small-icons"/>
                        <p>Min. 2 Years</p>
                    </div>
                    <div className="applyjob-sub-container5-1">
                        <img src="/src/assets/JobItem/eng-icon.png"
                        className="small-icons"/>
                        <p>Basic English</p>
                    </div> 

                </div>
                <div className="applyjob-sub-container6">
                    <button className="apply-btn">Apply for job </button>
                    <button className="share-btn">Share</button>
                </div>     
            </div>
    
            <div className="applyjob-main-container">
                <div className="job-hilights-section">
                    <h1>Job highlights</h1>
                    <div className="job-hilights-sub1">
                        <img src="/src/assets/JobItem/people-icon.png"
                        className="small-icons"/>
                        <p>26 applicatiions</p>
                    </div>
                    <div className="job-hilights-sub1">

                        <p>benifitsa include:laptop, Health insurance.</p>
                    </div>
                </div>
                <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>
                <div className="job-description-section">
                    <h1>Job Description</h1>
                    <p>Role and Responsibilites:</p>
                    <ul className="list-part">
                        <li>Need front end react js developer with min 2yrs experience.</li>
                        <li>Can work from Hyderabad / Vizag.</li>
                        <li>Send your resumes</li>
                    </ul>
                </div>
    
                <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>
            
                <div className="job-down-section">
                    <h1>Job role</h1>
                    <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                        <div className="job-down-position">
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/company-icon2.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>work location</h1>
                                    <p>Indian Airlines Colony, Patigadda, Begumpet, Hyderabad, Telangana, India</p>
                                </div>
                            </div>
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/role-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Role / Category</h1>
                                    <p>Software Development</p>
                                </div>
                            </div>
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/workshifts-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Shift</h1>
                                    <p>day Shift</p>
                                </div>
                            </div>
                        </div>
                        <div className="job-down-position">
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/department-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Department</h1>
                                    <p>Software Engineering</p>
                                </div>
                            </div>
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/emp-time-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Employer type</h1>
                                    <p>Full Time</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
        
                <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>
    
                <div className="job-down-section">
                    <h1>Job requirements</h1>
                    <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                        <div className="job-down-position">
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/exp-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Experience</h1>
                                    <p>min. 2 Years</p>
                                </div>
                            </div>
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/eng-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>English level</h1>
                                    <p>Basic English</p>
                                </div>
                            </div>
                        </div>
                        <div className="job-down-position">
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/education-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Education</h1>
                                    <p>Graduate</p>
                                </div>
                            </div>
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/gender-icon.png" className="small-icons"/>
                                <div className="job-down-sub1-1">
                                    <h1>Gender</h1>
                                    <p>Any gender</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
    
                <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>
    
                <div className="job-down-section">
                    <h1>Interview details</h1>
                    <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                        <div className="job-down-position">
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/phone-icon.png" className="money-icon"/>
                                <div className="job-down-sub1-1">
                                    <h1>interview mode</h1>
                                    <p>Online/Telephonic</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
    
                <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>
    
                <div className="job-down-section">
                    <h1>About Company</h1>
                    <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                        <div className="job-down-position">
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/company-icon2.png" className="money-icon"/>
                                <div className="job-down-sub1-1">
                                    <h1>Name</h1>
                                    <p>Kotammal Thunai Saanvi Structural Soln Private Limited</p>
                                </div>
                            </div>
                            <div className="job-down-sub1">
                                <img src="/src/assets/JobItem/company-icon2.png" className="money-icon"/>
                                <div className="job-down-sub1-1">
                                    <h1>Address</h1>
                                    <p>Indian Airlines Colony, Patigadda, Begumpet, Hyderabad, Telangana, India</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
    
                <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>
    
                <p className="footer-para">Job posted by Kotammal Thunai Saanvi Structural Soln Private Limited</p>
            </div>
        </div>   
        <div style={{'width': '23%', 'marginTop': '0.9%', 'marginLeft': '1%'}}>  
            <div className="applyjob-side-section1"> 
                <div className="applyjob-side-container">
                    <div className="applyjob-sidesub-container1">
                        <img src="/src/assets/JobItem/companys-icon.png" className="companys-icon1"/>
                        <div className="applyjob-sub-container2">
                            <h1>Front-end Developer(react.js)</h1>
                            <p>kotammal Thunai Saanvi Structural Slon Private Limited</p>
                        </div>
                    </div>            
                </div>   
            </div>
            <div className="applyjob-side-section2"> 
                <div className="applyjob-side-container">
                    <div className="applyjob-sidesub-container1">
                        <img src="/src/assets/JobItem/companys-icon.png"
                        className="companys-iconsmall"/>
                        <div className="applyjob-sub-container2">
                            <h1>Front-end Developer(react.js)</h1>
                            <p>kotammal Thunai Saanvi Structural Slon Private Limited</p>
                        </div>
                    </div>
                    <div className="applyjob-sidesub-container3">
                        <img src="/src/assets/JobItem/location-icon.png"
                        className="location-icon"/>
                        <p>Begumpet, Hyderabad</p>
                    </div>
                    <div className="applyjob-sidesub-container3">
                        <img src="/src/assets/JobItem/money-icon.png"
                        className="location-icon"/>
                        <p>₹35,000 -₹53,000 monthly</p>
                    </div>         
                    <div className="applyjob-sidesub-container5">
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/company-icon2.png"
                            className="small-icons"/>
                            <p>Work From Office</p>
                        </div>
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/emp-time-icon.png"
                            className="small-icons"/>
                            <p>Full Time</p>
                        </div>
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/exp-icon.png"
                            className="small-icons"/>
                            <p>Min. 2 Years</p>
                        </div>                   
                    </div>   

                    <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>

                    <div className="applyjob-sidesub-container1">
                        <img src="/src/assets/JobItem/companys-icon.png"
                        className="companys-iconsmall"/>
                        <div className="applyjob-sub-container2">
                            <h1>Front-end Developer(react.js)</h1>
                            <p>kotammal Thunai Saanvi Structural Slon Private Limited</p>
                        </div>
                    </div>
                    <div className="applyjob-sidesub-container3">
                        <img src="/src/assets/JobItem/location-icon.png"
                        className="location-icon"/>
                        <p>Begumpet, Hyderabad</p>
                    </div>
                    <div className="applyjob-sidesub-container3">
                        <img src="/src/assets/JobItem/money-icon.png"
                        className="location-icon"/>
                        <p>₹35,000 -₹53,000 monthly</p>
                    </div>         
                    <div className="applyjob-sidesub-container5">
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/company-icon2.png"
                            className="small-icons"/>
                            <p>Work From Office</p>
                        </div>
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/emp-time-icon.png"
                            className="small-icons"/>
                            <p>Full Time</p>
                        </div>
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/exp-icon.png"
                            className="small-icons"/>
                            <p>Min. 2 Years</p>
                        </div>                   
                    </div>  

                    <hr style={{'width': '100%', 'borderWidth': '0', 'backgroundColor':'rgb(179, 179, 179)', 'height': '1px'}}/>

                    <div className="applyjob-sidesub-container1">
                        <img src="/src/assets/JobItem/companys-icon.png"
                        className="companys-iconsmall"/>
                        <div className="applyjob-sub-container2">
                            <h1>Front-end Developer(react.js)</h1>
                            <p>kotammal Thunai Saanvi Structural Slon Private Limited</p>
                        </div>
                    </div>
                    <div className="applyjob-sidesub-container3">
                        <img src="/src/assets/JobItem/location-icon.png"
                        className="location-icon"/>
                        <p>Begumpet, Hyderabad</p>
                    </div>
                    <div className="applyjob-sidesub-container3">
                        <img src="/src/assets/JobItem/money-icon.png"
                        className="location-icon"/>
                        <p>₹35,000 -₹53,000 monthly</p>
                    </div>         
                    <div className="applyjob-sidesub-container5">
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/company-icon2.png"
                            className="small-icons"/>
                            <p>Work From Office</p>
                        </div>
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/emp-time-icon.png"
                            className="small-icons"/>
                            <p>Full Time</p>
                        </div>
                        <div className="applyjob-sidesub-container5-1">
                            <img src="/src/assets/JobItem/exp-icon.png"
                            className="small-icons"/>
                            <p>Min. 2 Years</p>
                        </div>                   
                    </div>    
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobItem
