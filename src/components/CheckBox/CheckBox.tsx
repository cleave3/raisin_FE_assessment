import React, { InputHTMLAttributes, ReactNode, useId } from 'react'
import './CheckBox.css'

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({ label, ...props }) => {
  /**
   * Ensure there is always an ID to enable custom checkox use label for check/uncheck action
   */
  const id = useId()
  const inputId = props?.id ?? id
  return (
    <div className='app-checkbox-container'>
      <input {...props} type='checkbox' id={inputId} className={`app-checkbox`} />
      <label htmlFor={inputId} className='app-checkbox-label'>
        {label}
      </label>
    </div>
  )
}

export default CheckBox
