import { Navigator, NavigatorParams } from 'Models'
import { useSelector } from 'react-redux'
import { selectUserPermission } from '../features/login/authSlice'

export const createNav = (data: Navigator) => {
  const { name, nav } = data

  const permission = JSON.parse(
    JSON.parse(localStorage['persist:rootAdmin'])?.auth
  )?.permission
  // const permission = useSelector(selectUserPermission)

  // console.log(permission, '----------------------------------permission')

  // const resources: any = {}
  // const routes: any = {}
  let navResult: any = []
  let menuResult: any = []

  nav.forEach((nav: NavigatorParams) => {
    let childrenMenu: any[] = []

    //đệ quy để trên là có lý do(tạo ra nav có url dài lên đầu, do Route không để extra)
    if (nav.children && nav.children.length > 0) {
      const childrenNav = createNav({
        nav: nav.children,
        name
      })

      navResult.push(...childrenNav[`${name}Nav`])
      childrenMenu.push(...childrenNav[`${name}Menu`])
    }

    if (nav.path) {
      // routes[resourceNav] = nav.path
      navResult.push({
        name: name,
        // key: `${name}-${nav.action}`,
        resource: nav.resources,
        path: nav.path,
        component: nav.component,
        // actionType: nav.actionType,
        isMenu: nav.isMenu,
        isProtected: nav.isProtected
      })
    }

    if (nav.isMenu && permission.includes(nav?.resources)) {
      const menu: any = {
        icon: nav?.icon,
        path: nav?.path,
        name: nav?.name,
        resource: nav?.resources
        // resource
        // actionType: nav.actionType
      }

      if (childrenMenu?.length > 0) {
        menu.routes = childrenMenu
      }

      menuResult.push(menu)
    }
  })

  return {
    [`${name}Menu`]: menuResult,
    [`${name}Nav`]: navResult
  }
}
