import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const ReportList = lazy(() => import('./ReportList'))

export const reportNavName: string = 'report'

export const nav: NavigatorParams[] = [
  {
    path: `/${reportNavName}`,
    name: 'Thống kê',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: ReportList,
    resources: reportNavName
  }
]

export const { reportMenu, reportNav } = createNav({
  nav,
  name: reportNavName
})
