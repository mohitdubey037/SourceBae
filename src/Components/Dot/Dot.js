import React from 'react'
import colors from '../../Constants/colors'

const Dot = ({ size = 4, ...props }) => <div
  style={{ width: `${size}px`, height: `${size}px`, borderRadius: '999px', backgroundColor: colors.BLACK_700 }}
  {...props}
/>

export default Dot