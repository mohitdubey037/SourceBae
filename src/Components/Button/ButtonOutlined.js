import React from 'react'
import colors from '../../Constants/colors'
import { Bold2024 } from '../Text/Texts'

const ButtonOutlined = ({ label, onClick }) => {
  return (
    <div
      className='px-11 rounded-lg border border-primary-pink-700 hover:border-primary-pink-900 cursor-pointer justify-center items-center flex'
      style={{ paddingTop: '10px', paddingBottom: '10px' }}
      onClick={onClick}
    >
      <Bold2024 text={label} style={{ color: colors.PRIMARY_PINK }} />
    </div>
  )
}

export default ButtonOutlined