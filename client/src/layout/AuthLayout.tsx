import { PageLoading } from '@ant-design/pro-layout'
import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import NoFoundPage from '../PageLoading/page404'
import { navAuth } from '../routes/nav'
import RouteCustomizeV2 from '../routes/RouteCustomize'

export default () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <ToastProvider autoDismiss autoDismissTimeout={2500}>
        <Switch>
          {navAuth.map((nav, index) => (
            <RouteCustomizeV2
              exact={true}
              key={index}
              path={String(nav.path)}
              component={nav.component}
              isProtected={nav.isProtected}
            />
          ))}
          <Route key={'notFoundPage'} render={() => <NoFoundPage />} />
        </Switch>
      </ToastProvider>
    </Suspense>
  )
}

// export default AuthLayout
