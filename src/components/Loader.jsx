import React from 'react'

const Loader = ({isFullpage = true}) => {
  return (
    <div class={`${isFullpage ? 'spinner-fullpage' : 'spinner'}`}>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  )
}

export default Loader
