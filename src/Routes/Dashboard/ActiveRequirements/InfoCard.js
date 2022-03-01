import React from 'react'
import SizedBox from '../../../Components/SizedBox/SizedBox'
import './InfoCard.css'

const InfoCard = ({ selectedOption }) => {

  let options = [
    { title: 'Most recent' },
    { title: 'budget' },
    { title: 'contract period( short- high)' }
  ]

  return (
    <div className='ICCard' >
      {
        options?.map((item, index) => (
          <>
            <text onClick={() => selectedOption(item.title)} className='ICItem' >{item.title}</text>
            {options?.length != (index + 1) && <SizedBox height={'12px'} />}
          </>
        ))
      }
    </div>
  )
}

export default InfoCard