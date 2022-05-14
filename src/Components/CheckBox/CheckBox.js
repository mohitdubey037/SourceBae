import React from 'react'
import { Images } from '../../assets/images'

const CheckBox = ({ isChecked, onClick }) => {
  return (
    <div
      className='flex h-fite w-fit justify-center items-center cursor-pointer'
      onClick={onClick}
    >
      <img
        src={isChecked ? Images.checkedBox : Images.unCheckedBox}
      />
    </div>
  )
}

export default CheckBox