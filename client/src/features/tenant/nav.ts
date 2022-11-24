import { NavigatorParams } from 'Models'
import { InboxOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const TenantList = lazy(() => import('./TenantList'))

export const tenantNavName: string = 'tenant'

export const nav: NavigatorParams[] = [
  {
    path: `/${tenantNavName}`,
    name: 'Nhà cung cấp',
    isMenu: true,
    isProtected: true,
    icon: React.createElement(InboxOutlined),
    component: TenantList,
    resources: tenantNavName
  }
]

export const { tenantMenu, tenantNav } = createNav({
  nav,
  name: tenantNavName
})
