import * as React from 'react'
import { useSelector } from 'react-redux'
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  useLocation
} from 'react-router'
import {
  selectAccessToken,
  selectUserLoggedIn,
  selectUserPermission
} from '../features/login/authSlice'
import NoAuthorizedPage from '../PageLoading/page403'

type RouteComponent =
  | React.FunctionComponent<RouteComponentProps<any>>
  | React.ComponentClass<any>

interface IProps {
  key: number
  exact?: boolean
  path: string
  component: RouteComponent
  isProtected: boolean
  resource?: string
  // action?: Action
  // permission?: string[]
}

const RouteCustom = (props: RouteProps & IProps) => {
  const { path, component, isProtected, resource, ...rest } = props

  // console.log(resource, '-----------------------------resource')

  const { pathname, search } = useLocation()

  const accessToken = useSelector(selectAccessToken)
  const permission = useSelector(selectUserPermission)

  // console.log(accessToken, '--------------------------------------accessToken')
  // console.log(
  //   permission,
  //   '--------------------------------------accepermissionssToken'
  // )

  const renderComponent =
    (ComponentInput?: RouteComponent) => (props: RouteProps) => {
      if (isProtected) {
        if (!!accessToken) {
          if (permission?.includes(resource)) {
            return (
              // @ts-ignore
              <ComponentInput />
            )
          } else {
            return <NoAuthorizedPage />
          }
        } else {
          return <Redirect to={`/auth/login?redirect=${pathname}${search}`} />
        }
      }

      return (
        // @ts-ignore
        <ComponentInput />
      )
    }
  return (
    <Route {...rest} path={String(path)} render={renderComponent(component)} />
  )
}

export default RouteCustom
