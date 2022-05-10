import React from 'react'

const InputField = ({ type = 'text', name, id, placeholder, className = 'bg-f9f9f9 w-full border flex border-1e1e1e rounded-md p-3', style, onChange, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  )
}

export default InputField