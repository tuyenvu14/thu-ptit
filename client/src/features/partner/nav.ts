import { NavigatorParams } from 'Models'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'
import { TeamOutlined } from '@ant-design/icons'

const PartnerList = lazy(() => import('./PartnerList'))
const PartnerAbilityCreate = lazy(() => import('./PartnerAbilityCreate'))
const PartnerAbilityConfig = lazy(() => import('./PartnerAbilityConfig'))

export const partnerNavName: string = 'partner'

export const nav: NavigatorParams[] = [
  {
    name: 'Quản lý thợ',
    isMenu: true,
    icon: React.createElement(TeamOutlined),
    component: PartnerList,
    isProtected: true,
    resources: partnerNavName,
    children: [
      {
        path: `/${partnerNavName}`,
        name: 'Danh sách thợ',
        isMenu: true,
        isProtected: true,
        component: PartnerList,
        resources: partnerNavName
      },
      {
        path: `/${partnerNavName}-ability`,
        name: 'Năng lực thợ',
        isMenu: true,
        isProtected: true,
        component: PartnerList,
        resources: 'partnerAbility',
        children: [
          {
            path: `/${partnerNavName}-ability/create`,
            name: 'Tạo năng lực thợ',
            isMenu: true,
            isProtected: true,
            component: PartnerAbilityCreate,
            resources: 'partnerAbility'
          },
          {
            path: `/${partnerNavName}-ability/config`,
            name: 'Cấu hình năng lực thợ',
            isMenu: true,
            isProtected: true,
            component: PartnerAbilityConfig,
            resources: 'partnerAbility'
          }
        ]
      }
    ]
  }
]

export const { partnerMenu, partnerNav } = createNav({
  nav,
  name: partnerNavName
})
