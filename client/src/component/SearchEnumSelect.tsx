import React from 'react'
import { Select } from 'antd'

type Props = {
  onChange?: any
  placeholder: string
  value: any
  options: any
  excludes?: any
  allowClear?: boolean
  multi?: boolean
  mode?: 'multiple' | 'tags'
  disabled?: boolean
}

const { Option } = Select
const SearchEnumSelect = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    options,
    excludes,
    allowClear = true,
    multi,
    mode,
    disabled = false
  } = props

  let data = options
  if (excludes && excludes.length > 0) {
    data = options.filter(function (option: any) {
      return !excludes.includes(option.value)
    })
  }

  return (
    <Select
      disabled={!!disabled}
      style={{ width: '100%' }}
      defaultValue={value}
      mode={!!multi ? 'multiple' : undefined}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      // mode={mode}
      // disabled={disabled}
    >
      {data.map((option: any) => {
        return (
          <Option value={option.value} key={option.value}>
            {option.label}
          </Option>
        )
      })}
    </Select>
  )
}

export default SearchEnumSelect
