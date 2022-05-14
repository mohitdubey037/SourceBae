import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-responsive-modal'
import { Images } from '../../assets/images'
import colors from '../../Constants/colors'
import { headerStrs } from '../../Constants/strings'
import cookie from 'react-cookies'
import { REMOTE_DASHBOARD } from '../../Redux/action/actionTypes'
import SizedBox from '../SizedBox/SizedBox'
import { Bold1619, Regular1421, SemiBold1624 } from '../Text/Texts'
import { ReactComponent as Gear } from '../../assets/images/general/gear.svg'
import { ReactComponent as Logout } from '../../assets/images/general/logout.svg'

const Header = () => {

  const dispatch = useDispatch()
  const { selectedRemoteTab } = useSelector(state => state.generalReducer)

  const [openMenu, setopenMenu] = useState(false)

  const tabs = [
    { id: 1, label: headerStrs.activeRequirement, icon: Images.statistics },
    { id: 2, label: headerStrs.addDeveloper, icon: Images.brackets },
    { id: 3, label: headerStrs.addPortfolio, icon: Images.files },
    { id: 4, label: headerStrs.fullTimeHiring, icon: Images.search2 }
  ]

  const onTabClick = (id) => {
    dispatch({
      type: REMOTE_DASHBOARD,
      payload: id
    })
  }

  const logoutHandler = () => {
    localStorage.clear();
    cookie.remove('Authorization');
    window.location.href = '/';
  };

  let desp = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et diam et neque placerat dapibus ut non risus. Suspendisse at consectetur dui, non scelerisque felis.'

  return (
    <div
      className='flex justify-between h-24 items-center py-7 px-10 '
      style={{ background: 'linear-gradient(3.61deg, #BC53FF -71.51%, #9E06FF 76.79%)' }}
    >
      <div className='flex items-center w-9/12 justify-between' >
        <img src={Images.SBLogoWhite} />
        {
          tabs?.map(item => (
            <div
              onClick={() => onTabClick(item.id)}
              style={{ opacity: selectedRemoteTab !== item?.id ? '0.5' : '1' }}
            >
              <HeaderTabs
                text={item.label}
                icon={item.icon}
                isSelected={selectedRemoteTab === item.id}
              />
            </div>
          ))
        }
      </div>
      <div className='flex items-center' >
        <img src={Images.statistics} />
        <SizedBox height={'10px'} width={'10px'} />
        <div onClick={() => setopenMenu(true)} className='cursor-pointer flex items-center' >
          <Bold1619 text={'Mujahid'} style={{ color: colors.WHITE }} />
          <SizedBox height={'10px'} width={'10px'} />
          <img
            src={Images.downArrowWhite}
            style={{ color: colors.WHITE }}
          />
        </div>
        <Modal
          open={openMenu}
          showCloseIcon={false}
          onClose={() => setopenMenu(false)}
          styles={{
            closeButton: { outline: 'none' },
            modal: { position: 'absolute', width: '300px', right: '0px', borderRadius: '4px', padding: '0px' },
            modalContainer: { position: 'relative' }
          }}
        >
          <div className='pt-3' >
            <div className='flex flex-col px-3' >
              <SemiBold1624 text={'Hii Mujahid'} style={{ color: colors.PRIMARY_PINK_DARK }} />
              <SizedBox height={'10px'} />
              <Regular1421 text={desp} />
            </div>
            <div className='my-1' >
              <div className='flex py-2 px-3 hover:bg-primary-pink-300' >
                <Gear fill={colors.BLACK} />
                <SizedBox height={'10px'} width={'10px'} />
                <SemiBold1624 text={'Setting'} style={{ color: colors.BLACK }} />
              </div>
              <div
                className='flex py-2 px-3 hover:bg-primary-pink-300'
                onClick={logoutHandler}
              >
                <Logout fill={colors.BLACK} />
                <SizedBox height={'10px'} width={'10px'} />
                <SemiBold1624 text={'Logout'} style={{ color: colors.BLACK }} />
              </div>
            </div>
          </div>
        </Modal>
      </div >
    </div >
  )
}

export const HeaderTabs = ({ icon, isSelected, text }) => (
  <div className='flex items-center cursor-pointer' >
    <img src={icon} className='border-l-1 p-2' style={{ borderColor: isSelected ? colors.WHITE : 'transparent' }} />
    <Bold1619 text={text} style={{ color: colors.WHITE }} />
  </div>
)

export default Header