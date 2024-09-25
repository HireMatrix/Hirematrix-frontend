import { Link } from 'react-router-dom'
import dropDownPng from '../../assets/dropdown.png'
import {useDispatch} from 'react-redux'
import { togglePopup } from '../../features/loginpopup/loginpopupSlice'
import hamburger from '../../assets/icons-hamburger.png'
import { useState } from 'react'
import { IoMdClose } from "react-icons/io";

const LandingPageHeader = () => {

    const dispatch = useDispatch()
    const onClickingcandidateLogin = () => {
        dispatch(togglePopup())
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const togglePopHam = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    const toggleSubMenu = (subMenuId) => {
      setActiveSubMenu(activeSubMenu === subMenuId ? null : subMenuId);
    };


  return (
    <nav className="nav-bar">
        <div className="nav-bar-container">
            <div className="nav-bar-container-options">
                <img src={hamburger} alt='hamburger-icon' onClick={togglePopHam}/>
                <Link to='/'>
                    <img src="https://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png" alt="logo"/>
                </Link>
                {
                    window.location.pathname !== '/' && (
                        <Link to='/'>Home</Link>
                    )
                }
                <div className="nav-links-container">
                    <ul className="nav-links-items-list">
                        <li className="nav-links-item">
                            <a href="#">Job 
                                <img className="drop-down-img" src={dropDownPng}/>
                            </a>
                            <div className="dropdown-container">
                                <ul className="dropdown-list">
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                </ul>
                                
                                {/* <!-- line break --> */}
                                
                                <hr className='hr-tag-landingPage-header'/>

                                <ul className="dropdown-sub-list">
                                    <li>
                                        <a href="#">Work From Home 
                                            <img className="drop-down-img" src={dropDownPng}/>
                                        </a>
                                        <div className="dropdown-sub-container">
                                            <ul>
                                                <li>
                                                    <a href="#">drop drop 1</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 1</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 1</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 1</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">Work From Home 
                                            <img className="drop-down-img" src={dropDownPng}/>
                                        </a>
                                        <div className="dropdown-sub-container">
                                            <ul>
                                                <li>
                                                    <a href="#">drop drop 2</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 2</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 2</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 2</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">Work From Home 
                                            <img className="drop-down-img" src={dropDownPng}/>
                                        </a>
                                        <div className="dropdown-sub-container">
                                            <ul>
                                                <li>
                                                    <a href="#">drop drop 3</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 3</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 3</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 3</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">Work From Home
                                            <img className="drop-down-img" src={dropDownPng}/>
                                        </a>
                                        <div className="dropdown-sub-container">
                                            <ul>
                                                <li>
                                                    <a href="#">drop drop 4</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 4</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 4</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 4</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">Work From Home
                                            <img className="drop-down-img" src={dropDownPng}/>
                                        </a>
                                        <div className="dropdown-sub-container">
                                            <ul>
                                                <li>
                                                    <a href="#">drop drop 5</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 5</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 5</a>
                                                </li>
                                                <li>
                                                    <a href="#">drop drop 5</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-links-item">
                            <a href="#">Career Compass 
                                <img className="drop-down-img" src={dropDownPng}/>
                            </a>
                            <div className="dropdown-container career-dropdown">
                                <ul className="dropdown-list">
                                    <li>
                                        <a href="/resume-builder">
                                            AI Resume Builder
                                        </a>
                                    </li>
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                </ul>
                                <hr className='hr-tag-landingPage-header'/>
                                <div className="watch-video-container">
                                    <img src="" alt=""/>
                                    <button>Watch video</button>
                                </div>
                            </div>
                        </li>
                        <li className="nav-links-item">
                            <a href="#">Community 
                                <img className="drop-down-img" src={dropDownPng}/>
                            </a>
                            <div className="dropdown-container community-dropdown">
                                <ul className="dropdown-list">
                                    <li><a href="#">Work From Home</a></li>
                                    <li><a href="#">Work From Home</a></li>
                                </ul>
                                <hr className='hr-tag-landingPage-header'/>
                                <div className="watch-video-container">
                                    <img src="" alt=""/>
                                    <button>Watch video</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="login-buttons-container">
                <Link to="/employer-login" target='_blank' style={{border: 'none', outline: 'none'}}>
                    <button className="employer-btn">Employer Login</button>
                </Link>
                <button className="candidate-btn" onClick={onClickingcandidateLogin}>Candidate Login</button>
            </div>
            <img src={hamburger} alt='hamburger-icon' className='mobile-ham-icon' onClick={togglePopHam}/>
            <div id="popupWindow" className={`popup-window ${isPopupOpen ? 'open' : ''}`}>
                <div className='popup-sub-window'>
                    <div className="popup-content">
                        <button className="close-popup" onClick={togglePopHam}>
                            <IoMdClose/>
                        </button>
                        <ul className="popup-menu">
                            <li className="popup-item" onClick={() => toggleSubMenu('homeSubMenu')}>
                                <a href="#">Job</a>
                                <ul id="homeSubMenu" className={`submenu ${activeSubMenu === 'homeSubMenu' ? 'open' : ''}`}>
                                    <li className="submenu-item"><a href="#">Work from Home 1</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 2</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 3</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 4</a></li>
                                </ul>
                            </li>
                            <li className="popup-item" onClick={() => toggleSubMenu('aboutSubMenu')}>
                                <a href="#">Career Compass</a>
                                <ul id="aboutSubMenu" className={`submenu ${activeSubMenu === 'aboutSubMenu' ? 'open' : ''}`}>
                                    <li className="submenu-item"><a href="#">Work from Home 1</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 2</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 3</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 4</a></li>
                                </ul>
                            </li>
                            <li className="popup-item" onClick={() => toggleSubMenu('servicesSubMenu')}>
                                <a href="#">Community</a>
                                <ul id="servicesSubMenu" className={`submenu ${activeSubMenu === 'servicesSubMenu' ? 'open' : ''}`}>
                                    <li className="submenu-item"><a href="#">Work from Home 1</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 2</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 3</a></li>
                                    <li className="submenu-item"><a href="#">Work from Home 4</a></li>
                                </ul>
                            </li>
                            <li className="popup-item" onClick={() => toggleSubMenu('contactSubMenu')}>
                                <a href="#">Contact</a>
                                <ul id="contactSubMenu" className={`submenu ${activeSubMenu === 'contactSubMenu' ? 'open' : ''}`}>
                                    <li className="submenu-item"><a href="#">Contact 1</a></li>
                                    <li className="submenu-item"><a href="#">Contact 2</a></li>
                                    <li className="submenu-item"><a href="#">Contact 3</a></li>
                                    <li className="submenu-item"><a href="#">Contact 4</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default LandingPageHeader
