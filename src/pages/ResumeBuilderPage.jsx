import React from 'react'

const ResumeBuilderPage = () => {
  return (
    <div className='resume-builder-page-main-container'>
      ResumeBuilderPage 
      {/* ----------Hero Section ------------------ */}
      <header className = "resumeBHead">
        <h1 className = "Rh1">Career Compass</h1>
        <nav id={Rnav}>
            <ul id={Rul}>
                <li className = "Rli"><a href="#" class="active">Resumes</a></li>
                <li className = "Rli"><a href="#">Cover Letters</a></li>
            </ul>
        </nav>
    </header>
    {/* --------------- Main Section ------------------ */}
    <main>
        <div className="content">
            <img src="resume-icon.png" alt="Resume Icon" class="icon"></img>
            <h2>Create your best resume to advance career</h2>
            <p>Build from scratch or pre-fill it with LinkedIn, or Apna profile</p>
            <button class="create-btn">+ Create new resume</button>
        </div>
    </main>
    </div>
    
  )
}

export default ResumeBuilderPage
