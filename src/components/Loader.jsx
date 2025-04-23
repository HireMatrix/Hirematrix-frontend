import React from 'react'

const Loader = ({isFullpage = false}) => {
  return (
    <div className={isFullpage ? 'spinner-fullpage' : 'spinner'}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}

export default Loader
