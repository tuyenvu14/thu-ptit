import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const DashBoardView = lazy(() => import('./index'))

export const dashboardNavName: string = 'dashboard'

export const nav: NavigatorParams[] = [
  {
    path: `/`,
    isMenu: false,
    isProtected: true,
    component: DashBoardView,
    resources: dashboardNavName
  }
]

export const { dashboardMenu, dashboardNav } = createNav({
  nav,
  name: dashboardNavName
})
