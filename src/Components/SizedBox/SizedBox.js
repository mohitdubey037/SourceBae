import React from 'react'

function SizedBox({ height, width, id }) {
  return (
    <div style={{ height, width }} id={id} />
  )
}

export default SizedBox