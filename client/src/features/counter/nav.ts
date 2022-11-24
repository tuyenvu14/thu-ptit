import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const Counter = lazy(() => import('./Counter'))

export const counterNavName: string = 'counter'

export const nav: NavigatorParams[] = [
  {
    path: `/${counterNavName}`,
    name: 'Bộ đếm',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: Counter,
    resources: counterNavName
  }
]

export const { counterMenu, counterNav } = createNav({
  nav,
  name: counterNavName
})
