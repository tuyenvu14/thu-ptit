// libs
import React, { useEffect, useState } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import { Select, Spin } from 'antd'
import { OptionProps } from 'antd/lib/select'
import _ from 'lodash'
// custom hook
import { useNotification } from '../../hook/useNotification'
import { useDebounce } from '../../hook/useDebounce'
// constants
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../constants/index'
// extensions
import utils from '../../extensions/object'
//api
// models
import { SelectProps } from 'Models'
import { useSearchCustomersQuery } from '../../features/customer/apiREST'

const Option = Select.Option

const CustomerSelect: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    valueSelected,
    allowClear,
    disabled,
    type,
    exception,
    handleChangeOption,
    hideSelected,
    multi,
    path,
    placeholder,
    onChange
  } = props

  const [keyword, setKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading } = useSearchCustomersQuery({
    keyword: valueSelected ?? keyword,
    limit: DEFAULT_PAGE_SIZE,
    offset: DEFAULT_PAGE_INDEX
  })

  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  useEffect(() => {
    setKeyword(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const [listOptions, setListOptions] = useState([])
  // @ts-ignore
  const [currentValue, setCurrentValue] = useState(
    utils.getValueOption(listOptions, valueSelected)
  )

  useEffect(() => {
    if (data) {
      handleResetData(data)
    }
  }, [data])

  // useNotification(error)

  useEffect(() => {
    // @ts-ignore
    setCurrentValue(utils.getValueOption(listOptions, valueSelected))
  }, [listOptions, valueSelected])

  const handleChangeSelection = (value: any) => {
    // @ts-ignore
    const optionSelected = utils.getValueOption(listOptions, value)
    setCurrentValue(optionSelected)
    handleChangeOption?.(path, optionSelected)

    if (onChange) {
      if (optionSelected) {
        const valueChange = _.isArray(optionSelected)
          ? optionSelected.map((value: any) => value.value)
          : optionSelected.value
        onChange(valueChange)
      } else {
        onChange(null)
      }
    }
  }
  const handleSearchSelection = (value: any) => {
    if (value != '') {
      setSearchTerm(value)
    }
  }

  const handleResetData = (listCategories: any) => {
    let options = []
    if (listCategories && listCategories.length > 0) {
      options = listCategories.map((category: any) => ({
        value: category.id,
        label: category.ten,
        key: category.id
      }))
    }
    // @ts-ignore
    let listOptions = utils.initValueToOption(currentValue, options)
    // @ts-ignore
    setCurrentValue(utils.getValueOption(listOptions, currentValue))
    // @ts-ignore
    setListOptions(listOptions)
  }

  let options = listOptions
  if (hideSelected && exception && exception.length > 0) {
    // @ts-ignore
    options = options.filter((item) => !exception.includes(item.value))
  }

  return (
    <Select
      disabled={!!disabled}
      mode={!!multi ? 'multiple' : undefined}
      showSearch
      labelInValue
      value={currentValue}
      allowClear={!!allowClear}
      placeholder={placeholder ?? 'Chọn khách hàng'}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      style={{ width: '100%' }}
      filterOption={(input, option) =>
        //@ts-ignore
        option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onChange={handleChangeSelection}
      onSearch={handleSearchSelection}
      onBlur={() => setKeyword('')}
      suffixIcon={<CaretDownOutlined />}
      showArrow
    >
      {options && options.length > 0
        ? options.map((item: OptionProps) => (
            <Option key={item.value} title={item.label} value={item.value}>
              {item.label}
            </Option>
          ))
        : null}
    </Select>
  )
}

export default CustomerSelect
