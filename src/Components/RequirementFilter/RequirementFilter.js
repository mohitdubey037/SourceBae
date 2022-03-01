import React, { useEffect, useState } from 'react'
import styles from './RequirementFilter.module.css'
import filter from '../../assets/images/filter/filter.png'
import SizedBox from '../SizedBox/SizedBox'
import { Radio } from 'pretty-checkbox-react'
import colors from '../../Constants/colors'

export default function RequirementFilter() {

  const [selectedFilters, setselectedFilters] = useState([])
  const [openFilter, setopenFilter] = useState(false)

  const handleRadioChecks = (option) => {
    let isSelected = selectedFilters.some(item => item === option)
    console.log(isSelected)
    isSelected
      ? setselectedFilters(selectedFilters.filter(item => item !== option))
      : setselectedFilters([...selectedFilters, option])
  }

  const isChecked = option => selectedFilters.some(item => item === option)


  return (
    <div>
      <div onClick={() => setopenFilter(!openFilter)} className={styles.filterContainer}  >
        <text className={styles.filterText} >Filter</text>
        <img src={filter} className={styles.filterImage} />
      </div>
      {openFilter && <div className={styles.filterOptionsBox} >

        <FilterTitle title={'Recent'} />
        <SizedBox height={'10px'} />
        <div className={styles.recentFilter} >
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="recentRadio" onClick={() => handleRadioChecks(1)} checked={isChecked(1)} />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>Today</label>
            </div>
          </div>
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="recentRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>This Week</label>
            </div>
          </div>
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="recentRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label> This month</label>
            </div>
          </div>
        </div>
        <SizedBox height={'30px'} />

        <FilterTitle title={'Budget'} />
        <SizedBox height={'10px'} />
        <div className={styles.budgetFilter} >
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="budgetRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>₹500-1000</label>
            </div>
          </div>
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="budgetRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>₹1000-2000</label>
            </div>
          </div>
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="budgetRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>₹2000-3000</label>
            </div>
          </div>
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="budgetRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>more than ₹4ooo</label>
            </div>
          </div>
        </div>
        <SizedBox height={'30px'} />

        <FilterTitle title={'Contract Filter'} />
        <SizedBox height={'10px'} />
        <div className={styles.budgetFilter} >
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="contractRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>03-06 month</label>
            </div>
          </div>
          <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
            <input type="radio" name="contractRadio" />
            <SizedBox width={'8px'} />
            <div class="state p-info-o" className={styles.radioLabel}>
              <label>06-12 month</label>
            </div>
          </div>
        </div>
        <div class="pretty p-icon p-curve p-pulse" className={styles.radioStyle} >
          <input type="radio" name="contractRadio" />
          <SizedBox width={'8px'} />
          <div class="state p-info-o" className={styles.radioLabel}>
            <label>more than 12 month </label>
          </div>
        </div>
        <SizedBox height={'30px'} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <div>
            <FilterButton title={'Clear all'} color={colors.RED} onClick={() => alert()} />
          </div>
          <div style={{ display: 'flex' }} >
            <FilterButton title={'Cancel'} color={colors.GREY} onClick={() => alert()} />
            <SizedBox width={'16px'} />
            <FilterButton title={'Apply'} color={colors.BLUE} onClick={() => alert()} />
          </div>
        </div>
      </div>}
    </div>
  )
}

export const FilterTitle = ({ title }) => (
  <text className={styles.filterTitle} >{title}</text>
)

export const FilterButton = ({ title, color, onClick }) => (
  <div>
    <text className={styles.filterButton} style={{ color }} onClick={onClick} >{title}</text>
  </div>
)
