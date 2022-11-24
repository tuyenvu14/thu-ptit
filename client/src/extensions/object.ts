// libs
import _ from 'lodash'
// models

export default {
  convertNumberToVND: (value: number) => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  },

  formatObjectSelect: (
    rawValue: any,
    valueField: string,
    labelField: string
  ) => {
    if (rawValue) {
      return {
        ...rawValue,
        key: valueField ? rawValue[valueField] : rawValue.id,
        value: valueField ? rawValue[valueField] : rawValue.id,
        label: labelField ? rawValue[labelField] : rawValue.name
      }
    }
    return null
  },

  formatImageObject: (id: string, url: string) => {
    return url
      ? {
          uid: id || null,
          status: 'done',
          url: url
        }
      : null
  },

  getValueOption(data: [any] | any, originValue: string | any) {
    if (data && data.length > 0) {
      if (_.isArray(originValue) && originValue) {
        let optionSelected = originValue.map((item) => {
          if (item && item.id) {
            return {
              ...item,
              value: item.id,
              label: item.name,
              key: item.id
            }
          } else if (item && item.value) {
            return {
              ...item,
              value: item.value,
              label: item.label,
              key: item.value
            }
          } else if (item && item.key) {
            return {
              ...item,
              value: item.key,
              label: item.label
            }
          } else {
            const value = _.find(data, (x) => x.value === item)
            if (value) {
              return {
                ...value,
                key: value.value
              }
            }
            return null
          }
        })
        optionSelected = _.compact(optionSelected)
        optionSelected = _.filter(optionSelected, (item) => item.value)
        return optionSelected
      }
      if (_.isObject(originValue)) {
        let valueOption: string = ''
        //@ts-ignore
        if (originValue.id) {
          //@ts-ignore
          valueOption = originValue.id?.toString()
          //@ts-ignore
        } else if (originValue.value) {
          //@ts-ignore
          valueOption = originValue.value?.toString()
          //@ts-ignore
        } else if (originValue.key) {
          //@ts-ignore
          valueOption = originValue.key?.toString()
        }
        let optionSelected = _.find(
          data,
          (item) => item.value == valueOption || item.code == valueOption
        )
        if (optionSelected) {
          optionSelected = {
            ...originValue,
            ...optionSelected
          }
        }
        return optionSelected
      }
      if (_.isString(originValue) || _.isNumber(originValue)) {
        let optionSelected = _.find(
          data,
          (item) => item.value == originValue || item.code == originValue
        )
        if (optionSelected) {
          return {
            ...optionSelected,
            key: originValue
          }
        }
      }
    }
    return undefined
  },

  initValueToOption(optionSelected: any | [any], listOptions: [any]) {
    if (optionSelected) {
      if (_.isArray(optionSelected)) {
        optionSelected.forEach((option) => {
          const index = listOptions.findIndex(
            (item) => item.value == option.value
          )
          if (index < 0) {
            listOptions.push(option)
          }
        })
      } else if (_.isObject(optionSelected)) {
        const index = listOptions.findIndex(
          //@ts-ignore
          (item) => item.value == optionSelected.value
        )
        if (index < 0) {
          listOptions.push(optionSelected)
        }
      }
    }

    return listOptions
  }
}
