import React, { useState } from 'react'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import SizedBox from '../../../Components/SizedBox/SizedBox'
import './SearchAndFilter.css'
import RequirementFilter from '../../../Components/RequirementFilter/RequirementFilter'

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

export default function SearchAndFilter() {


  return (
    <div className='searchBoxAR' >
      <text className='searchText' >Search</text>
      <SizedBox height={'26px'} />
      <div className='searchWrapper' >
        <div>
          <text className='searchTitle' >job title or keyword</text>
        </div>
        <SizedBox height={'14px'} />
        <SearchBar />
      </div>
      <SizedBox height={'36px'} />
      <text className='searchText' >filter</text>
      <SizedBox height={'14px'} />
      <RequirementFilter />
    </div>
  )
}
