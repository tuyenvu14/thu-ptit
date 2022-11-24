import { NavigatorParams } from 'Models'
import { SolutionOutlined, UserOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const CustomerList = lazy(() => import('./CustomerList'))
const CustomerCreate = lazy(() => import('./CustomerCreate'))

export const customerNavName: string = 'customer'

export const nav: NavigatorParams[] = [
  {
    name: 'Khách hàng',
     path: `/${customerNavName}`,
    isMenu: true,
    isProtected: true,
    icon: React.createElement(SolutionOutlined),
    resources: customerNavName,
    component: CustomerList,
    // children: [
    //   {
    //     path: `/${customerNavName}`,
    //     name: 'Danh sách khách hàng',
    //     isMenu: true,
    //     isProtected: true,
    //     component: CustomerList,
    //     resources: customerNavName
    //   },
    //   {
    //     path: `/${customerNavName}/create`,
    //     name: 'Tạo khách hàng',
    //     isMenu: false,
    //     isProtected: true,
    //     component: CustomerCreate,
    //     resources: customerNavName
    //   }
    // ]
  }
]

export const { customerMenu, customerNav } = createNav({
  nav,
  name: customerNavName
})
