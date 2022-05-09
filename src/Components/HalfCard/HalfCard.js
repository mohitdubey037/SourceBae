import React from 'react'
import { Images } from '../../assets/images'
import { LoginImgs } from '../../assets/images/Login'
import { Bold2401, SemiBold1624 } from '../Text/Texts'
import SizedBox from '../../Components/SizedBox/SizedBox'
import { AGENCY } from '../../shared/constants'

const HalfCard = ({ role }) => {

  return (
    <div className='flex bg-primary-pink-700 h-full w-full relative overflow-hidden justify-center' >

      <img
        alt="stair patterned image"
        src={LoginImgs.stairsPattern}
        className='absolute -top-4 -left-4'
      />
      <img
        alt="info"
        src={role === AGENCY ? LoginImgs.agencyIllustration : LoginImgs.clientIllustration}
        className='scale-85 absolute top-8 right-0'
      />
      <img
        alt="stair patterned image"
        src={LoginImgs.stairsPattern}
        className='scale-95 absolute -bottom-16 -right-8 rotate-180'
      />

      <div className='w-full' style={{ position: 'absolute', top: '65%' }} >
        <Bold2401
          text={'Some Heading will come here'}
          style={{ width: '100%', textAlign: 'center', color: '#fff' }}
        />
        <SizedBox height={'.5rem'} />
        <SemiBold1624
          style={{
            width: '100%', textAlign: 'center', textTransform: 'capitalize', color: '#fff'
          }}
          text='just some click and Let set go !!!!!'
        />

        <SizedBox height={'2rem'} />
        <div className='flex flex-col w-full justify-center items-center' >

          <div className='flex w-2/3 justify-evenly'>
            <div className='flex items-center flex-col w-full opacity-50' >
              <img src={Images.clock} alt="clock" className='h-6 w-6 m-3' />
              <SemiBold1624 text='24 Hour' style={{ color: '#fff' }} />
              <SemiBold1624 text='Profile Match' style={{ color: '#fff' }} />
            </div>
            <div className='flex items-center flex-col w-full' >
              <img src={Images.brackets} alt="clock" className='h-6 w-6 m-3' />
              <SemiBold1624 text='1000+' style={{ color: '#fff' }} />
              <SemiBold1624 text='Developers' style={{ color: '#fff' }} />
            </div>
            <div className='flex items-center flex-col w-full opacity-50' >
              <img src={Images.suitcase} alt="clock" className='h-6 w-6 m-3' />
              <SemiBold1624 text='200+' style={{ color: '#fff' }} />
              <SemiBold1624 text='Agency' style={{ color: '#fff' }} />
            </div>
          </div>
          <SizedBox height={'2rem'} />
          <div className='flex w-full justify-center' >
            <div className='flex w-1/4 justify-evenly'>
              <img src={Images.circleFilled} alt="clock" className='opacity-50' />
              <img src={Images.circleFilled} alt="clock" className='opacity-1' />
              <img src={Images.circleFilled} alt="clock" className='opacity-50' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HalfCard