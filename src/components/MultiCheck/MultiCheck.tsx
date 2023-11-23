import React, { ChangeEvent, useMemo } from 'react'
import CheckBox from '../CheckBox'
import './MultiCheck.css'

export type Option = {
  label: string
  value: string
  disabled?: boolean // added this prop for a case where an option needs to be disabled
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void // optional onChange handler
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 * @param {boolean} showSelectAll - determine if the select all checkbox show be added to list
 * @param {React.CSSProperties} React.CSSProperties - style the multicheck label
 * @param {React.CSSProperties} containerStyle - style the multicheck container
 */
type Props = {
  label?: string
  options: Option[]
  columns?: number
  values?: string[]
  onChange?: (options: Option[]) => void
  showSelectAll?: boolean
  selectAllLabel?: string
  labelStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
}

const MultiCheck: React.FunctionComponent<Props> = ({
  label,
  options = [],
  columns = 1,
  values = [],
  onChange,
  showSelectAll = true,
  selectAllLabel = 'Select All',
  labelStyle,
  containerStyle
}): JSX.Element => {
  /**
   * filter out any disabled option. We don't want disabled options to be selectable
   */
  const nonDisabledOptions = useMemo(
    () =>
      options.filter((option) => {
        if (option?.disabled && values.includes(option?.value)) {
          return option
        }
        return !option?.disabled
      }),
    [options, values]
  )

  /**
   *  Keep track of any option that is disabled and checked by default
   */
  const unCheckableOptions = useMemo(
    () => options.filter((option) => option?.disabled && values.includes(option?.value)),
    [options, values]
  )

  const isChecked = (value: string): boolean => values.includes(value)

  const isAllSelected = values.length === nonDisabledOptions?.length

  const showSelectAllCheckbox = nonDisabledOptions.length > 0 && showSelectAll

  const selectOption = (value: string): Option[] => {
    return nonDisabledOptions.filter((option) => [...values, value].includes(option.value))
  }

  const removeOption = (value: string): Option[] => {
    return nonDisabledOptions.filter((option) => values.includes(option.value) && option.value !== value)
  }

  const handleChange = ({ target: { checked, value } }: ChangeEvent<HTMLInputElement>): void => {
    const currentOptions: Option[] = checked ? selectOption(value) : removeOption(value)
    onChange?.(currentOptions)
  }

  const handleSelectAll = ({ target: { checked } }: ChangeEvent<HTMLInputElement>): void => {
    const currentOptions: Option[] = checked ? nonDisabledOptions : [...unCheckableOptions]
    onChange?.(currentOptions)
  }

  const formattedOptions = useMemo(() => {
    const initialValue: Option[] = showSelectAllCheckbox
      ? [{ label: selectAllLabel, value: '', checked: isAllSelected, onChange: handleSelectAll }]
      : []

    return options.reduce((prev, cur) => {
      const option: Option = {
        label: cur.label,
        disabled: !!cur.disabled,
        value: cur.value,
        checked: cur?.checked || isChecked(cur.value),
        onChange: cur?.onChange || handleChange
      }

      return [...prev, option]
    }, initialValue)
  }, [options, values])

  return (
    <>
      <div className='multiCheck-label' style={labelStyle}>
        {label}
      </div>
      <div className='multiCheck' style={{ columnCount: columns, ...containerStyle }}>
        {formattedOptions.map((option, i) => (
          <CheckBox key={i} {...option} />
        ))}
      </div>
    </>
  )
}

export default MultiCheck
