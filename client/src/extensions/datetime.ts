// libs
import moment from 'moment'
// constants
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_FORMAT_DATE_EN,
  DEFAULT_FORMAT_DATE_TIME,
  DEFAULT_ISO_FORMAT_DATE,
  DEFAULT_ISO_FORMAT_DATE_TIME,
} from '../constants'

const INFINITY_DATE = new Date(9999, 11, 31, 23, 59, 59, 0)

export default {
  initDate(date: any) {
    if (date) {
      return moment(date)
    }
    return undefined
  },

  initDateQuery(date?: any) {
    if (date) {
      return moment(date).format(DEFAULT_ISO_FORMAT_DATE)
    }
    return ''
  },

  initDatetimeQuery(datetime?: any) {
    if (datetime) {
      return moment(datetime).format(DEFAULT_ISO_FORMAT_DATE_TIME)
    }
    return ''
  },

  initNewDate(currentDate: any) {
    if (currentDate) {
      return moment(currentDate)
    }
    return undefined
  },

  initNewVnDate(currentDate?: any, defaultDate?: any, nullable?: any) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE)
    }
    if (defaultDate) {
      return defaultDate
    }
    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE)
    }
    return null
  },

  initNewVnDateTime(currentDate?: any, nullable?: any) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE_TIME)
    }
    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE_TIME)
    }
    return null
  },

  initNewDateFromFormat(currentDate: any) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE_TIME)
    }
    return null
  },

  formatStartOfDay(currentDate: any, nullable?: any, lastMonth?: any) {
    if (currentDate) {
      return moment(currentDate).startOf('days').utc().format()
    }
    if (!nullable) {
      return moment(new Date()).startOf('days').utc().format()
    }
    if (lastMonth) {
      return moment(new Date()).startOf('months').utc().format()
    }
    return null
  },

  formatEndOfDay(currentDate: any, nullable?: any) {
    if (currentDate) {
      return moment(currentDate).endOf('days').utc().format()
    }
    if (!nullable) {
      return moment(new Date()).endOf('days').utc().format()
    }
    return null
  },

  /**
   * DD.MM.YYYY
   * @param currentDate
   * @param nullable
   * @returns {string|null}
   */
  formatVnDate(currentDate: any, nullable: any) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE)
    }

    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE)
    }
    return null
  },

  formatVnDateTime(currentDate: any, nullable: any) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE_TIME)
    }

    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE_TIME)
    }
    return null
  },

  /**
   * MM.DD.YYYY
   * @param currentDate
   * @param nullable
   * @returns {string|null}
   */
  formatEnDate(currentDate: any, nullable: any) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE_EN)
    }

    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE_EN)
    }
    return null
  },

  formatOnlyDate(currentDate: any) {
    return currentDate ? moment(currentDate).format('YYYY-MM-DD') : null
  },

  checkIsPreviousDate(currentDate: any, dateCheck: any) {
    return !!(
      currentDate &&
      dateCheck &&
      moment(currentDate).isBefore(moment(dateCheck))
    )
  },

  checkIsFutureDate(currentDate: any, dateCheck: any) {
    return !!(
      currentDate &&
      dateCheck &&
      moment(currentDate).isAfter(moment(dateCheck))
    )
  },

  subtractDuration(currentDate: any, subtract: any, type: any) {
    return currentDate ? moment(currentDate).subtract(subtract, type) : null
  },

  calculateVnYearDiff(currentDate: any, dateDiff: any) {
    if (currentDate && dateDiff) {
      return moment(currentDate, DEFAULT_FORMAT_DATE).diff(
        moment(dateDiff, DEFAULT_FORMAT_DATE),
        'years'
      )
    }
    return null
  },

  calculateVnDateDiff(currentDate: any, dateDiff: any) {
    if (currentDate && dateDiff) {
      return moment(currentDate).diff(moment(dateDiff), 'days')
    }
    return null
  },

  addDuration(currentDate: any, add: any, durationType: any) {
    if (currentDate) {
      const dateWithDuration = moment(currentDate).add(add, durationType)
      if (this.checkIsFutureDate(dateWithDuration, INFINITY_DATE)) {
        return moment(INFINITY_DATE).format()
      } else {
        return dateWithDuration.format()
      }
    }
    return null
  },

  getUserTimezone(currentDate: any, allowNull: any) {
    const timeZone = new Date().getTimezoneOffset()
    if (!currentDate) {
      return !allowNull
        ? moment(new Date()).subtract(timeZone, 'minutes').format()
        : null
    }
    return moment(currentDate).subtract(timeZone, 'minutes').format()
  },

  // @ts-ignore
  getUserVnTime({ currentDate, nullable, startOfDay, endOfDay }) {
    const timeZone = new Date().getTimezoneOffset()
    if (currentDate) {
      return moment(currentDate, DEFAULT_FORMAT_DATE_TIME)
        .add(timeZone, 'minutes')
        .format()
    }
    if (!nullable) {
      if (startOfDay) {
        return moment(new Date())
          .startOf('days')
          .add(timeZone, 'minutes')
          .format()
      }
      if (endOfDay) {
        return moment(new Date())
          .endOf('days')
          .add(timeZone, 'minutes')
          .format()
      }
      return moment(new Date()).add(timeZone, 'minutes').format()
    }
    return null
  },

  // @ts-ignore
  getDateRangeVnDateTime({ startDate, endDate, allowNull }) {
    //@ts-ignore
    const start = this.getUserVnTime({
      currentDate: startDate,
      nullable: allowNull,
      startOfDay: true
    })
    // @ts-ignore
    const end = this.getUserVnTime({
      currentDate: endDate,
      nullable: allowNull,
      endOfDay: true
    })
    return {
      startDate: start,
      endDate: end
    }
  },

  checkValidDate(date: any) {
    if (typeof date !== 'string') {
      return false
    }
    const currentDate = moment(date, moment.ISO_8601)
    return currentDate.isValid()
  },

  getStartUnitOfTime(currentDate: any, unit: any) {
    return currentDate
      ? moment(currentDate).startOf(unit)
      : moment(new Date()).startOf(unit)
  },

  getEndUnitOfTime(currentDate: any, unit: any) {
    return currentDate
      ? moment(currentDate).endOf(unit)
      : moment(new Date()).endOf(unit)
  },

  getFirstDayOfMonth() {
    return moment(new Date()).startOf('months').format(DEFAULT_ISO_FORMAT_DATE)
  },
  getCurrentDay() {
    return moment(new Date()).endOf('days').format(DEFAULT_ISO_FORMAT_DATE)
  },
  getDayBefore(space: any) {
    const date = new Date()
    const dateBefore = new Date(date.getTime() - space)
    return moment(dateBefore).format(DEFAULT_ISO_FORMAT_DATE)
  },
  disabledDate(current: any) {
    return current && current < moment().endOf('day')
  },
  disableFutureDate(current: any) {
    return current && current > moment().endOf('day')
  },
  disabledDateBefore(currentDate: any, date: any) {
    if (!date) {
      return false
    }
    return currentDate < moment(date).startOf('days')
  },
  formatDate(value: any) {
    if (value.startDate) {
      value.startDate = moment(value?.startDate).format(DEFAULT_ISO_FORMAT_DATE)
    }
    if (value.endDate) {
      value.endDate = moment(value?.endDate).format(DEFAULT_ISO_FORMAT_DATE)
    }
    return value
  },
  disableCustom(current: any, value: number, type: any) {
    return moment().add(value, type) > current
  },
  disabledDateBeforeCustom(currentDate: any, date: any, value: any) {
    if (!date) {
      return false
    }
    return currentDate < moment(date).subtract(value).startOf('days')
  },
  disabledDateAfter(currentDate: any, date: any) {
    if (!date) {
      return false
    }
    return currentDate > moment(date).startOf('days')
  },
}
