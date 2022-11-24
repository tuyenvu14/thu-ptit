import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const OrderList = lazy(() => import('./OrderList'))
const OrderPayment = lazy(() => import('./OrderPayment'))

export const orderNavName: string = 'order'

export const nav: NavigatorParams[] = [
  {
    path: `/${orderNavName}`,
    name: 'Đơn hàng',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: OrderList,
    resources: orderNavName
  },
  {
    path: `/${orderNavName}/payment/:id`,
    name: 'Đơn hàng',
    isMenu: false,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: OrderPayment,
    resources: orderNavName
  }
]

export const { orderMenu, orderNav } = createNav({
  nav,
  name: orderNavName
})
