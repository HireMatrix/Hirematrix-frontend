
const CandidateInfiniteSlider = ({candidateList}) => {
    const {imgUrl, text} = candidateList
  return (
    <li className='infinite-scroll-list'>
        <img src={imgUrl} alt='user-img'/>
        <p>{text}</p>
    </li>
  )
}

export default CandidateInfiniteSlider
