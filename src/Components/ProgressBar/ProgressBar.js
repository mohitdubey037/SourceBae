import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className='h-2 w-full bg-light-pink-700' >
      <div className='h-2 bg-purple-700' style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar