import filterIcon from '../assets/jobSearchPageImg/filter-icon.png'
import dropDown from '../assets/dropdown.png'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilter, removeFilter, initialState, resetFilter } from '../features/filter/filterSlice'
import { fetchedJobs } from '../features/filter/filterFetchSlice'

const FilterPage = () => {

    const dispatch = useDispatch()
    const filters = useSelector(state => state.filter)

    const explabelRef = useRef(null)
    const exprangeref = useRef(null) 

    const salarylabelRef = useRef(null)
    const salaryrangeRef = useRef(null)

    const sortByValues = [
        {id: "relevant", label: "Relevant"},
        {id: "salary-high-to-low", label: "Salary - High to low"},
        {id: "experience-high-to-low", label: "Experience - High to low"},
        {id: "DatePosted-new-to-old", label: "Date posted - New to Old"}
    ]

    const datePostedValues = [
        {id: "all", label: "All", value: "All"},
        {id: "last-24-hours", label: "Last 24 hours", value: '24'},
        {id: "last-3-days", label: "Last 3 days", value: '72'},
        {id: "last-7-days", label: "Last 7 days", value: '128'}
    ]

    const highestEduValues = [
        {id: "10-or-below-10th", label: "10 or Below 10th"},
        {id: "12th-pass", label: "12th Pass"},
        {id: "diploma", label: "Diploma"},
        {id: "iti", label: "ITI"},
        {id: "graduate", label: "Graduate"},
        {id: "post-graduate", label: "Post Graduate"}
    ]

    const englishLevelValues = [
        {id: "no-english", label: "No English"},
        {id: "basic-english", label: "Basic English"},
        {id: "intermediate-english", label: "Intermediate English"},
        {id: "advanced-english", label: "Advanced English"}
    ]

    const genderValues = [
        {id: "female", label: "Female"},
        {id: "male", label: "Male"}
    ]

    const [active, setActive] = useState({
        sortBy: true,
        experience: true,
        salary: true,
        datePosted: true,
        highestEducation: true,
        workMode: true,
        workType: true,
        workShift: true,
        englishLevel: true,
        gender: true
    })

    const [experienceValueText, setExperienceValueText] = useState('')
    const [salaryValueText, setSalaryValueText] = useState('₹ 0')

    const [workModeCheckBox, setWorkModeChechBox] = useState([
        {id: "work-from-home", label: "Work from home", checked: false},
        {id: "work-from-office", label: "Work from office", checked: false},
        {id: "work-from-field", label: "Work from field", checked: false}
    ])
    const [workTypeCheckBox, setWorkTypeCheckBox] = useState([
        {id: "full-time", label: "Full time", checked: false},
        {id: "part-time", label: "Part time", checked: false}
    ])
    const [workShiftCheckBox, setWorkShiftCheckBox] = useState([
        {id: "day-shift", label: "Day shift", checked: false},
        {id: "night-shift", label: "Night shift", checked: false}
    ])

    const [clearFilter, setClearFilter] = useState(false)

  // search results

  const onchangingWorkmodeCheckBox = (e) => {
    const { name } = e.target
    setWorkModeChechBox(prev => 
        prev.map(item => 
            item.label === name ? {...item, checked: !item.checked} : item
        )
    )
    const newWorkMode = filters.workMode.includes(name) ? filters.workMode.filter(item => item !== name) : [...filters.workMode, name]
    dispatch(updateFilter({
        key: 'workMode', value: newWorkMode
    }));
  }

  const onchangingWorktypeCheckBox = (e) => {
    const { name } = e.target
    setWorkTypeCheckBox(prev => 
        prev.map(item => 
            item.label === name ? {...item, checked: !item.checked} : item
        )
    )
    const newWorkType = filters.workType.includes(name) ? filters.workType.filter(item => item !== name) : [...filters.workType, name]
    dispatch(updateFilter({
        key: 'workType', value: newWorkType
    }));
  }

  const onchangingWorkshiftCheckBox = (e) => {
    const { name } = e.target
    setWorkShiftCheckBox(prev =>
        prev.map(item => 
            item.label === name ? {...item, checked: !item.checked} : item
        )
    )
    const newWorkShift = filters.workShift.includes(name) ? filters.workShift.filter(item => item !== name) : [...filters.workShift, name]
    dispatch(updateFilter({
        key: 'workShift', value: newWorkShift
    }));
  }

  useEffect(() => {
    // console.log(filters)
    dispatch(fetchedJobs(filters))
  }, [dispatch, filters])

  useEffect(() => {
    const hasDifferences = Object.keys(filters).some(
        item => String(filters[item]) !== String(initialState[item])
    );

    if(hasDifferences){
        setClearFilter(true)
    } else {
        setClearFilter(false)
    }
  }, [filters])

//   range El
  useEffect(() => {
    const min = exprangeref.current.min;
    const max = exprangeref.current.max;

    if(filters.experience === '21'){
        setExperienceValueText('any')
    }
    else if(filters.experience === '0') {
        setExperienceValueText('Fresher')
    }
    else {
        setExperienceValueText(`${filters.experience}`)
    }

    const percentage = (filters.experience - min) / (max - min) * 100;
    explabelRef.current.style.left = `calc(${percentage}% + (${8}px))`;

  }, [filters.experience])

  useEffect(() => {
    const min = Number(salaryrangeRef.current.min);
    const max = Number(salaryrangeRef.current.max);

    if(filters.salary*10000 > 90000){
        setSalaryValueText(`₹ ${filters.salary/10} Lakh`)
    }
    else {
        setSalaryValueText(`₹ ${filters.salary*10000}`)
    }

    const percentage = (filters.salary - min) / (max - min) * 100;
    salarylabelRef.current.style.left = `calc(${percentage}% + (${8}px))`
  }, [filters.salary])

  return (
    <form>
        <div className='filter-icon-container'>
            <div>
                <img src={filterIcon} loading='lazy' alt='filter-icon'/>
                <p>Filters</p>
            </div>
            {
                clearFilter && (
                    <p onClick={() => dispatch(resetFilter())}>Clear all</p>
                )
            }
        </div>
        <div className='diff-filter-items'>
            {
                Object.keys(filters).map(item => {
                    if(String(filters[item]) !== String(initialState[item])){
                        // setClearFilter(prev => !prev.clearFilter)
                        if(item === 'experience'){
                            if(filters.experience === '0'){
                                return (
                                    <span key={item} onClick={()=>dispatch(removeFilter(item))}>Fresher <span>x</span></span>
                                )
                            }else{
                                return (
                                    <span key={item} onClick={()=>dispatch(removeFilter(item))}>{`${filters[item]} years`} <span>x</span></span>
                                )
                            }
                        }
                        else if(item === 'salary'){
                            return (
                                <span key={item} onClick={()=>dispatch(removeFilter(item))}>{`₹ ${filters[item] * 10000}`} <span>x</span></span>
                            )
                        }
                        else if(item === 'datePosted'){
                            return(
                                <span 
                                    key={item} 
                                    onClick={()=>dispatch(removeFilter(item))} 
                                >
                                    {`Last ${filters[item]} hours`} <span>x</span>
                                </span>
                            )
                        }
                        return (<span key={item} onClick={()=>dispatch(removeFilter(item))}>{filters[item]} <span>x</span></span>)
                    }
                })
            }
        </div>
        <div className='filter-sortby-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, sortBy: !prev.sortBy}))}>
                <p>Sort By</p>
                <img 
                    src={dropDown} 
                    alt='drop-down-icon'
                    loading='lazy'
                    className={`filter-section-dropdownimg ${active.sortBy ? 'rotate' : ''}`}
                />
            </div>
            <div className={`${active.sortBy ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {
                    sortByValues.map(item => (
                        <label htmlFor={item.id} key={item.id}>
                            <input
                                type='radio'
                                id={item.id}
                                value={item.label}
                                checked={item.label === filters.sortBy}
                                onChange={(e) => 
                                    dispatch(updateFilter({
                                    key: 'sortBy', value: e.target.value
                                }))}
                            />
                            {item.label}
                        </label>
                    ))
                }
            </div>
        </div>
        <div className='experience-range-filter-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, experience: !prev.experience}))}>
                <p>Experience</p>
                <img 
                src={dropDown} 
                loading='lazy'
                alt='drop-down-icon' 
                className={`filter-section-dropdownimg ${active.experience ? 'rotate' : ''}`}
                />
            </div>
            <p>Your work experience</p>
            <div className={`${active.experience ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                <input
                    type='range'
                    min={0}
                    max={21}
                    value={filters.experience}
                    onChange={(e) => 
                        dispatch(updateFilter({
                        key: 'experience' ,value: e.target.value
                    }))}
                    ref={exprangeref}
                />
                <span className='range-top-text' ref={explabelRef}>{filters.experience === 21 ? 'any' : filters.experience === 0 ? 'Fresher' : experienceValueText}</span>
                <div className='experience-label-container'>
                    <p>0 years</p>
                    <p>20 years</p>
                </div>
            </div>
        </div>
        <div className='salary-range-filter-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, salary: !prev.salary}))}>
                <p>Salary</p>
                <img 
                    src={dropDown}
                    loading='lazy'
                    alt='drop-down-icon' 
                    className={`filter-section-dropdownimg ${active.salary ? 'rotate' : ''}`}
                />
            </div>
            <p>Minimum monthly salary</p>
            <div className={`${active.salary ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                <input
                    type='range'
                    min={0}
                    max={15}
                    value={filters.salary}
                    onChange={(e) => 
                        dispatch(updateFilter({
                        key: 'salary' ,value: e.target.value
                    }))}
                    ref={salaryrangeRef}
                />
                <span className='range-top-text' ref={salarylabelRef}>{salaryValueText}</span>
                <div className='experience-label-container'>
                <p>0</p>
                <p>1.5 Lakhs</p>
                </div>
            </div>
        </div>
        <div className='datePosted-radio-options-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, datePosted: !prev.datePosted}))}>
                <p>Date posted</p>
                <img
                    src={dropDown} 
                    loading='lazy'
                    alt='drop-down-icon' 
                    className={`filter-section-dropdownimg ${active.datePosted ? 'rotate' : ''}`}
                />
            </div>
            <div className={`${active.datePosted ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {
                    datePostedValues.map(item => (
                        <label htmlFor={item.id} key={item.id}>
                            <input
                                id={item.id}
                                type='radio'
                                value={item.value}
                                checked={filters.datePosted === item.value}
                                onChange={(e) => 
                                    dispatch(updateFilter({
                                        key: 'datePosted' ,value: e.target.value
                                    }))}
                            />
                            {item.label}
                        </label>
                    ))
                }
            </div>
        </div>
        <div className='highestEdu-radio-options-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, highestEducation: !prev.highestEducation}))}>
                <p>Highest education</p>
                <img
                    src={dropDown}
                    loading='lazy'
                    alt='drop-down-icon' 
                    className={`filter-section-dropdownimg ${active.highestEducation ? 'rotate' : ''}`}
                />
            </div>
            <p>Select your highest education level to see all eligable jobs</p>
            <div className={`${active.highestEducation ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {
                    highestEduValues.map(item => (
                        <label htmlFor={item.id} key={item.id}>
                            <input
                                id={item.id}
                                type='radio'
                                value={item.label}
                                checked={filters.highestEducation === item.label}
                                onChange={(e) => 
                                    dispatch(updateFilter({
                                        key: 'highestEducation' ,value: e.target.value
                                    }))}
                            />
                            {item.label}
                        </label>
                    ))
                }
            </div>
        </div>
        <div className='workMode-checkBox-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, workMode: !prev.workMode}))}>
                <p>Work Mode</p>
                <img
                    src={dropDown} 
                    alt='drop-down-icon'
                    loading='lazy'
                    className={`filter-section-dropdownimg ${active.workMode ? 'rotate' : ''}`}
                />
            </div>
            <div className={`${active.workMode ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {workModeCheckBox.map((item) => (
                    <label htmlFor={item.id} key={item.id}>
                        <input
                            type='checkbox'
                            id={item.id}
                            name={item.label}
                            checked={item.checked}
                            onChange={onchangingWorkmodeCheckBox}
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
        <div className='workMode-checkBox-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, workType: !prev.workType}))}>
                <p>Work Type</p>
                <img
                    src={dropDown} 
                    alt='drop-down-icon'
                    loading='lazy' 
                    className={`filter-section-dropdownimg ${active.workType ? 'rotate' : ''}`}
                />
            </div>
            <div className={`${active.workType ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {workTypeCheckBox.map((item) => (
                    <label htmlFor={item.id} key={item.id}>
                        <input
                            type='checkbox'
                            id={item.id}
                            name={item.label}
                            checked={item.checked}
                            onChange={onchangingWorktypeCheckBox}
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
        <div className='workMode-checkBox-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, workShift: !prev.workShift}))}>
                <p>Work Shift</p>
                <img
                    src={dropDown}
                    loading='lazy'
                    alt='drop-down-icon' 
                    className={`filter-section-dropdownimg ${active.workShift ? 'rotate' : ''}`}
                />
            </div>
            <div className={`${active.workShift ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {workShiftCheckBox.map(item => (
                    <label htmlFor={item.id} key={item.id}>
                        <input
                            type='checkbox'
                            id={item.id}
                            name={item.label}
                            checked={item.checked}
                            onChange={onchangingWorkshiftCheckBox}
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
        <div className='english-radio-options-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, englishLevel: !prev.englishLevel}))}>
                <p>English level</p>
                <img
                    src={dropDown}
                    loading='lazy'
                    alt='drop-down-icon' 
                    className={`filter-section-dropdownimg ${active.englishLevel ? 'rotate' : ''}`}
                />
            </div>
            <p>Select  your English level to see all eligible jobs</p>
            <div className={`${active.englishLevel ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {
                    englishLevelValues.map(item => (
                        <label htmlFor={item.id} key={item.id}>
                            <input
                                id={item.id}
                                type='radio'
                                value={item.label}
                                checked={filters.englishLevel === item.label}
                                onChange={(e) => 
                                    dispatch(updateFilter({
                                        key: 'englishLevel' ,value: e.target.value
                                    }))}
                            />
                            {item.label}
                        </label>
                    ))
                }
            </div>
        </div>
        <div className='gender-radio-options-section'>
            <div className='dropDown-click-text' onClick={() => setActive(prev => ({...prev, gender: !prev.gender}))}>
                <p>Gender</p>
                <img
                    src={dropDown} 
                    loading='lazy'
                    alt='drop-down-icon' 
                    className={`filter-section-dropdownimg ${active.gender ? 'rotate' : ''}`}
                />
            </div>
            <div className={`${active.gender ? 'filter-options-group' : ''}`} style={{'display': 'none'}}>
                {
                    genderValues.map(item => (
                        <label htmlFor={item.id} key={item.id}>
                            <input
                                id={item.id}
                                type='radio'
                                value={item.label}
                                checked={filters.gender === item.label}
                                onChange={(e) => dispatch(updateFilter({
                                    key: 'gender' ,value: e.target.value
                                }))}
                            />
                            {item.label}
                        </label>
                    ))
                }
            </div>
        </div>
    </form>
)
}

export default FilterPage
