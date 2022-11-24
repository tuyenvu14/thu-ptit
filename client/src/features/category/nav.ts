import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const TenantList = lazy(() => import('./TenantList'))
const PitchList = lazy(() => import('./PitchList'))
const TimeList = lazy(() => import('./TimeList'))
const ProductList = lazy(() => import('./ProductList'))

export const categoryNavName: string = 'category'

export const nav: NavigatorParams[] = [
  {
    path: `/${categoryNavName}`,
    name: 'Danh mục và cấu hình',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: TenantList,
    resources: categoryNavName,
    children: [
      {
        path: `/${categoryNavName}-pitch`,
        name: 'Sân bóng',
        isMenu: true,
        isProtected: true,
        component: PitchList,
        resources: categoryNavName
      },
      {
        path: `/${categoryNavName}-time`,
        name: 'Khung giờ',
        isMenu: true,
        isProtected: true,
        component: TimeList,
        resources: categoryNavName
      },
      {
        path: `/${categoryNavName}-product`,
        name: 'Sản phẩm',
        isMenu: true,
        isProtected: true,
        component: ProductList,
        resources: categoryNavName
      }
    ]
  }
]

export const { categoryMenu, categoryNav } = createNav({
  nav,
  name: categoryNavName
})
