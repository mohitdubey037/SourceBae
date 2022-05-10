import React from 'react'

const RedStar = ({ size = '10px' }) => {
  return (
    <div className='text-red-500 pl-1 pb-4' style={{ height: size, width: size }} >*</div>
  )
}

export default RedStar