import React from 'react'
import './Tag.css'

const Tag = ({ title }) => {
  return (
    <div className='TAGcontainer' >
      <text className='TAGText' >{title}</text>
    </div>
  )
}

export default Tag
