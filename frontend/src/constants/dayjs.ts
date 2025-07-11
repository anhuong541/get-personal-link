import dayjs from 'dayjs'

import { getDateKey } from '@/lib/dayjs'

export const TODAY_NUM = dayjs().date()
export const CURRENT_YEAR = dayjs().year()
export const CURRENT_MONTH = dayjs().month()
export const CURRENT_TIMEKEY = getDateKey(CURRENT_YEAR, CURRENT_MONTH)

export const FULL_DATETIME_FORMAT = 'dddd, MMMM D, YYYY h:mm:ss A'
