import { NavigatorParams } from 'Models'
import { lazy } from 'react'
import { createNav } from '../../utils/createNav'

const Login = lazy(() => import('./Login'))

const loginNavName = 'login'

export const nav: NavigatorParams[] = [
  {
    name: 'Đăng nhập',
    path: `/auth/${loginNavName}`,
    isMenu: false,
    isProtected: false,
    component: Login
  }
]

export const { loginNav, loginMenu } = createNav({ nav, name: loginNavName })
