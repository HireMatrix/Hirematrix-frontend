import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import { togglePopup } from '../../features/loginpopup/loginpopupSlice'
import hamburger from '../../assets/icon-hamburger-white.png';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logOut } from '../../features/auth/authSlice';
import Loader from '../Loader';

const LandingPageHeader = () => {

    const dropDownBox = useRef();

    const { user, isLoading } = useSelector(state => state.auth);

    if(isLoading){
        return <Loader isFullpage={true}/>
    }

    // console.log(user?.user?.name);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [heightOfHr, setHeightOfHr] = useState(0);
    const [logoutLoding, setLogoutLoading] = useState(false);


    const togglePopHam = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    const toggleSubMenu = (subMenuId) => {
      setActiveSubMenu(activeSubMenu === subMenuId ? null : subMenuId);
    };

    const handleLogout = async () => {
        console.log("logout clicked")
        setLogoutLoading(true);
        await dispatch(logOut()).unwrap();
        setLogoutLoading(false);
        window.location.href = '/'
    }

    const handleViewProfileClick = () => {
        if(user.hasCompletedOnboarding) {
            return;
        }
        navigate('/candidate-details')
    }

    if(logoutLoding) {
        return <Loader isFullpage={true}/>
    }

    const handleAdminRouting = () => {
        console.log("handle admin route")
        navigate('/admin-panel/dashboard')
    }

    useEffect(() => {
        const heightOfDropDown = dropDownBox.current.offsetHeight;
        setHeightOfHr(heightOfDropDown);
    }, []);

    // useEffect(() => {

    //     const handleCloseSubMenuContainer = () => {
    //         setActiveSubMenu(null);
    //     }

    //     document.addEventListener("mousedown", handleCloseSubMenuContainer);
    // }, [activeSubMenu])


  return (
    <>
        <header className="nav-bar">
            <div className="nav-bar-container">
                <div className="nav-bar-container-options">
                    <img src={hamburger} loading='lazy' alt='hamburger-icon' onClick={togglePopHam}/>
                    <Link to="/">
                        <img 
                            src="/src/assets/hire.png" 
                            loading='lazy' 
                            alt="logo"
                        />
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
                                    <RiArrowDropDownLine style={{color: "white", fontSize: "25px"}}/>
                                </a>
                                <div className="dropdown-container">
                                    <ul className="dropdown-list" ref={dropDownBox}>
                                        <li><a href="#">Work From Home</a></li>
                                        <li><a href="#">Part Time Jobs</a></li>
                                        <li><a href="#">Freshers Jobs</a></li>
                                        <li><a href="#">Jobs for women</a></li>
                                        <li><a href="#">Full Time Jobs</a></li>
                                    </ul>

                                    {/* <!-- line break --> */}

                                    <hr className='hr-tag-landingPage-header' style={{
                                        height: `${heightOfHr}px`
                                    }}/>

                                    <ul className="dropdown-sub-list">
                                        <li>
                                            <a href="#"><span>Jobs By City</span>
                                                <RiArrowDropDownLine 
                                                    style={{color: "white", fontSize: "22px"}}
                                                />
                                            </a>
                                            <div className="dropdown-sub-container">
                                                <ul>
                                                    <li>
                                                        <a href="#">Jobs in Agra</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Jobs in Benguluru</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Jobs in Bhopal</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Jobs in Hyderabad</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#"><span>Jobs By Department</span> 
                                                <RiArrowDropDownLine style={{color: "white", fontSize: "22px"}}/>
                                            </a>
                                            <div className="dropdown-sub-container">
                                                <ul>
                                                    <li>
                                                        <a href="#">Admin Roles</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Consulting</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Data Science</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Customer Support</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#"><span>Jobs By Company</span>
                                                <RiArrowDropDownLine style={{color: "white", fontSize: "22px"}}/>
                                            </a>
                                            <div className="dropdown-sub-container">
                                                <ul>
                                                    <li>
                                                        <a href="#">Swiggy</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Paytm</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Blinkit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Just Dial</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#"><span>Jobs By Qualification</span>
                                                <RiArrowDropDownLine style={{color: "white", fontSize: "22px"}}/>
                                            </a>
                                            <div className="dropdown-sub-container">
                                                <ul>
                                                    <li>
                                                        <a href="#">10th Pass Jobs</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">12th Pass Jobs</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Diploma Jobs</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">ITI Jobs</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#">Others
                                                <RiArrowDropDownLine style={{color: "white", fontSize: "22px"}}/>
                                            </a>
                                            <div className="dropdown-sub-container">
                                                <ul>
                                                    <li>
                                                        <a href="#">Free Job Alert</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Download HireMatrix app</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Blogs</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Contact Us</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-links-item">
                                <a href="#">Career Compass 
                                    <RiArrowDropDownLine style={{color: "white", fontSize: "25px"}}/>
                                </a>
                                <div className="dropdown-container career-dropdown">
                                    <ul className="dropdown-list">
                                        <li>
                                            <a href="/resume-builder">
                                                AI Resume Builder
                                            </a>
                                        </li>
                                        <li><a href="/resume-checker">AI Resume checker</a></li>
                                        <li><a href="/ai-mock-interviews">AI Mock Interview</a></li>
                                        <li><a href="/blogs">Blogs</a></li>
                                    </ul>
                                    <hr className='hr-tag-landingPage-header' style={{
                                        height: `${heightOfHr}px`
                                    }}/>
                                    <div className="watch-video-container">
                                        {/* Todo: video or remove it */}
                                        {/* <img src="" alt="" loading='lazy'/> */}
                                        <button>Watch video</button>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-links-item">
                                <a href="#">Community 
                                    <RiArrowDropDownLine style={{color: "white", fontSize: "25px"}}/>
                                </a>
                                <div className="dropdown-container community-dropdown">
                                    <ul className="dropdown-list">
                                        <li><a href="#">Communities</a></li>
                                        <li><a href="#">Xclusives</a></li>
                                    </ul>
                                    <hr className='hr-tag-landingPage-header' style={{
                                        height: `${heightOfHr}px`
                                    }}/>
                                    <div className="watch-video-container">
                                        {/* Todo: video or remove it */}
                                        {/* <img src="" alt=""/> */}
                                        <button>Watch video</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {user ? (
                    <div className='user-details-dropDown-main-container' onClick={() => toggleSubMenu('UserDetailsMenu')}>
                        <p>{user.name.charAt(0)}</p>
                        <RiArrowDropDownLine style={{color: "white"}}/>
                        <div className={`user-details-dropDown ${activeSubMenu == 'UserDetailsMenu' ? 'open' : ''}`}>
                            <div>
                                <FaUser/>
                                <p onClick={handleViewProfileClick}>View Profile</p>
                            </div>
                            {
                                user.userType === 'admin' && (
                                    <div onClick={handleAdminRouting}>
                                        <MdAdminPanelSettings/>
                                        <p>Admin</p>
                                    </div>
                                )
                            }
                            <div onClick={handleLogout} style={{cursor: "pointer"}}>
                                <RiLogoutBoxLine/>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="login-buttons-container">
                        <Link to="/candidate-login" className='candidate-btn'>
                            <button>Login</button>
                        </Link>
                    </div>
                )}
                <img src={hamburger} alt='hamburger-icon' loading='lazy' className='mobile-ham-icon' onClick={togglePopHam}/>
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
                                        <li className="submenu-item"><a href="#">Work From Home</a></li>
                                        <li className="submenu-item"><a href="#">Part Time Jobs</a></li>
                                        <li className="submenu-item"><a href="#">Fresher Jobs</a></li>
                                        <li className="submenu-item"><a href="#">Full Time Jobs</a></li>
                                    </ul>
                                </li>
                                <li className="popup-item" onClick={() => toggleSubMenu('aboutSubMenu')}>
                                    <a href="#">Career Compass</a>
                                    <ul id="aboutSubMenu" className={`submenu ${activeSubMenu === 'aboutSubMenu' ? 'open' : ''}`}>
                                        <li className="submenu-item"><a href="#">AI Resume builder</a></li>
                                        <li className="submenu-item"><a href="#">AI Resume checker</a></li>
                                        <li className="submenu-item"><a href="#">AI Mock Interviews</a></li>
                                        <li className="submenu-item"><a href="#">Blog</a></li>
                                    </ul>
                                </li>
                                <li className="popup-item" onClick={() => toggleSubMenu('servicesSubMenu')}>
                                    <a href="#">Community</a>
                                    <ul id="servicesSubMenu" className={`submenu ${activeSubMenu === 'servicesSubMenu' ? 'open' : ''}`}>
                                        <li className="submenu-item"><a href="#">Communities</a></li>
                                        <li className="submenu-item"><a href="#">Xclusives</a></li>
                                    </ul>
                                </li>
                                <li className="popup-item" onClick={() => toggleSubMenu('contactSubMenu')}>
                                    <a href="#">Login</a>
                                    <ul id="contactSubMenu" className={`submenu ${activeSubMenu === 'contactSubMenu' ? 'open' : ''}`}>
                                        <li className="submenu-item"><a href="/candidate-login/">Candidate</a></li>
                                        <li className="submenu-item"><a href="/employer-login/">Recruiter</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default LandingPageHeader
