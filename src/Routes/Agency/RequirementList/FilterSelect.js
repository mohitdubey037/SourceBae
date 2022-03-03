import React, { useState } from 'react'
import styles from './FilterSelect.module.css'
import Select from 'react-select'

export default function FilterSelect({ options }) {

  return (
    <div>
      <Select
        options={options}
        className={styles.selectBox}
        isSearchable={false}
      />
    </div>
  )
}
