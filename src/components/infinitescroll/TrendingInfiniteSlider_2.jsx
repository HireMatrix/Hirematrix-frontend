
const TrendingInfiniteSlider_2 = ({trendingList, mouseEnter, mouseLeave, isHoverd, randomclass}) => {
    return (
        <li 
        onMouseEnter={mouseEnter} 
        onMouseLeave= {mouseLeave}    
        className={`trending-job-roles-list ${isHoverd ? randomclass : ''}`}
        >
            <p>{trendingList.jobText}</p>
            <p>{trendingList.numText}</p>
        </li>
  )
}

export default TrendingInfiniteSlider_2