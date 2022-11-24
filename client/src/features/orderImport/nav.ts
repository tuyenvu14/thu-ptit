import { NavigatorParams } from 'Models'
import { ImportOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const OrderImportList = lazy(() => import('./OrderImportList'))

export const orderImportNavName: string = 'orderImport'

export const nav: NavigatorParams[] = [
  {
    path: `/${orderImportNavName}`,
    name: 'Đơn hàng nhập',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(ImportOutlined),
    component: OrderImportList,
    resources: orderImportNavName
  }
]

export const { orderImportMenu, orderImportNav } = createNav({
  nav,
  name: orderImportNavName
})
