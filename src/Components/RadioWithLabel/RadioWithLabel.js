import React from 'react'
import colors from '../../Constants/colors'
import SizedBox from '../SizedBox/SizedBox'
import { Regular1624 } from '../Text/Texts'

const RadioWithLabel = ({ selected, label, name, value, onClick }) => {
  let eventObj = {
    currentTarget: {
      name,
      value
    }
  }
  return (
    <div
      className='flex cursor-pointer'
      onClick={() => onClick(eventObj, !selected)}
    >
      <div>
        <div className='rounded-full border flex justify-center items-center border-purple-900 h-6 w-6' >
          {selected && <div className='h-4 w-4 bg-purple-900' style={{ borderRadius: '999px' }} />}
        </div>
      </div>
      <SizedBox height='8px' width='8px' />
      <Regular1624 text={label} style={{ color: colors.BLACK_500 }} />
    </div>
  )
}

export default RadioWithLabel