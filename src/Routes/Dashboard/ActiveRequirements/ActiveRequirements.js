import React from 'react'
import './ActiveRequirements.css'
import SearchAndFilter from './SearchAndFilter'
import PromotionalStrip from './PromotionalStrip'
import LNavbar from '../../MainLandingPage/Components/Navbar/LNavbar'
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard'

export default function ActiveRequirements() {

  let data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium nibh pellentesque in egestas velit, risus turpis mi. Tempor sed morbi ut lobortis dictum ac fames. Aenean lobortis elementum tempus interdum odio aenean sollicitudin bibendum. Ac ante pulvinar ullamcorper sed dui cursus rutrum. Non morbi lorem netus tempor, id. Nullam erat donec facilisi vel amet ridiculus velit quis.'

  return (
    <>
      <LNavbar />
      <PromotionalStrip />
      <div className='bodyWrapper' >
        <div className='greyCard' >
          <h1 className='heading' >Current Requirements</h1>
          <div className='partition' >
            <div className='listContainer' >
              {Array(6).fill('maq').map((ele, index) =>
                <RequirementsCard des={{ des: data }} showButton={false} buttonTitle={'Apply now'} />
              )}
            </div>
            <div className='optionsContainer' >
              <SearchAndFilter />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
