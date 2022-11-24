import { customerMenu, customerNav } from '../features/customer/nav'
import { partnerMenu, partnerNav } from '../features/partner/nav'
import { Route } from '@ant-design/pro-layout/lib/typings'
import { counterMenu, counterNav } from '../features/counter/nav'
import { postMenu, postNav } from '../features/post/nav'
import { dashboardMenu, dashboardNav } from '../features/dashboard/nav'
import { loginMenu, loginNav } from '../features/login/nav'
import { orderMenu, orderNav } from '../features/order/nav'
import { orderImportMenu, orderImportNav } from '../features/orderImport/nav'
import { tenantMenu, tenantNav } from '../features/tenant/nav'
import { categoryMenu, categoryNav } from '../features/category/nav'
import { reportMenu, reportNav } from '../features/report/nav'

export const menuRoot: Route[] = [
  ...orderMenu,
  ...orderImportMenu,
  // ...partnerMenu,
  ...customerMenu,
  ...tenantMenu,
  // ...counterMenu,
  // ...postMenu,
  ...categoryMenu,
  ...reportMenu,
  ...dashboardMenu
  // ...loginMenu
]

export const navRoot: Route[] = [
  ...orderNav,
  ...orderImportNav,
  ...customerNav,
  ...tenantNav,
  ...partnerNav,
  ...categoryNav,
  ...reportNav,
  // ...counterNav,
  // ...postNav,
  ...dashboardNav
]

export const navAuth: Route[] = [...loginNav]
