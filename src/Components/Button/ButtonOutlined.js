import React from 'react'
import colors from '../../Constants/colors'
import { Bold2024, Medium1624 } from '../Text/Texts'

const ButtonOutlined = ({ label, onClick, style, medium }) => {
  return (
    <div
      className='px-11 rounded-lg border border-primary-pink-700 hover:border-primary-pink-900 cursor-pointer justify-center items-center flex'
      style={style ?? { paddingTop: '10px', paddingBottom: '10px' }}
      onClick={onClick}
    >
      {
        medium
          ? <Medium1624 text={label} style={{ color: colors.PRIMARY_PINK }} />
          : <Bold2024 text={label} style={{ color: colors.PRIMARY_PINK }} />
      }
    </div>
  )
}

export default ButtonOutlined