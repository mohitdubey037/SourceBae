import React from 'react'
import { Bold2024 } from '../Text/Texts'

const ButtonFilled = ({ label, onClick }) => {
  return (
    <div
      className='bg-primary-pink-700 hover:bg-primary-pink-900 px-11 rounded-lg border cursor-pointer justify-center items-center flex'
      style={{ paddingTop: '10px', paddingBottom: '10px' }}
      onClick={onClick}
    >
      <Bold2024 text={label} style={{ color: '#fff' }} />
    </div>
  )
}

export default ButtonFilled