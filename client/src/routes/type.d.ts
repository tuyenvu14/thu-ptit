declare module 'Models' {
  import { Action, ActionType } from 'constants/enum'

  export interface Navigator {
    // menuName?: string
    name: string
    nav: NavigatorParams[]
  }

  export interface NavigatorParams {
    key?: string
    name?: string
    path?: string
    isMenu: boolean
    icon?: JSX.Element
    isProtected: boolean
    component?: React.LazyExoticComponent<() => JSX.Element>
    children?: NavigatorParams[]
    resources?: string
    // action: Action
    // actionType: ActionType
    // component?: any
  }
}
