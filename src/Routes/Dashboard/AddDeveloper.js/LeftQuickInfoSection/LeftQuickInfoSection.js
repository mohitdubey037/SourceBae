import React from 'react'
import { Images } from '../../../../assets/images'
import { Bold1619, Bold1827, Medium1624, Regular1624 } from '../../../../Components/Text/Texts'
import Dot from '../../../../Components/Dot/Dot'
import colors from '../../../../Constants/colors'
import SizedBox from '../../../../Components/SizedBox/SizedBox'
import ProgressBar from '../../../../Components/ProgressBar/ProgressBar'

const LeftQuickInfoSection = () => {

  let infoArray = [
    { label: 'Today’s platfrom states', progress: 25 },
    { label: 'new developer added number', progress: 79 },
    { label: 'agency registered till today', progress: 49 },
    { label: 'hire developer', progress: 55 },
    { label: 'new requirment posted', progress: 25 },
    { label: 'project value posted', progress: 85 },
  ]

  let tips = [
    'Add a LinkedIn id to get more authenticity to your profile ',
    'Add email to get a faster invite for an interview ',
    'Add Projects to get your skill to validate ',
    'Set average price to get more Opportunities '
  ]

  return (
    <div className='w-full h-full m-3 flex flex-col relative' >
      <div className='h-10' >
        <img src={Images.pinkRect} />
      </div>
      <div className='w-full flex flex-col absolute top-8 right-0' >
        <div className='bg-ffffff h-fit rounded-10 border-1e1e1e border px-3 shadow-[0_25px_35px_rgba(0,0,0,0.07)]' >
          {
            infoArray?.map(item => (
              <div className='flex flex-col w-full pt-3 pl-1' key={item.label} >
                <div className='flex h-fit w-full' >
                  <Dot size={6} className='mt-2' />
                  <SizedBox height='4%' width='4%' />
                  <Medium1624 text={item.label} style={{ textTransform: 'capitalize' }} />
                </div>
                <div className='flex justify-between items-center mt-1' >
                  <div style={{ width: '100%', marginLeft: '5%', marginRight: '9%' }} >
                    <ProgressBar progress={item.progress} />
                  </div>
                  <Bold1827 text={item.progress} style={{ opacity: '0.5' }} />
                </div>
              </div>
            ))
          }
          <SizedBox height={'10px'} />
        </div>
        <div className='flex flex-col bg-ffffff h-fit rounded-10 border-1e1e1e border p-3 mt-12 shadow-[0_25px_35px_rgba(0,0,0,0.07)]' >
          <div className='flex w-full justify-center items-center' >
            <img src={Images.bulb} />
            <Bold1619 text={'Pro Tips'} style={{ color: colors.PURPLE_700 }} />
          </div>
          {
            tips?.map(item => (
              <div key={item} className='flex h-fit w-full pl-1 pt-6' >
                <Dot size={6} className='mt-2' />
                <SizedBox height='4%' width='4%' />
                <Regular1624 text={item} style={{ color: colors.BLACK_700, textTransform: 'capitalize' }} />
              </div>
            ))
          }
        </div>
        <SizedBox height={'20px'} />
      </div>
    </div>
  )
}

export default LeftQuickInfoSection