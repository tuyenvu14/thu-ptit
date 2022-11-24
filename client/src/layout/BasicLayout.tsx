import { Suspense } from 'react'
import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import ProLayout from '@ant-design/pro-layout'
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { menuRoot, navRoot } from '../routes/nav'
import { PageLoading } from '@ant-design/pro-layout'
import NoFoundPage from '../PageLoading/page404'
import logo from '../assets/download.png'
import { ToastProvider } from 'react-toast-notifications'
import RouteCustomizeV2 from '../routes/RouteCustomize'
import AvatarComponent from '../component/AvatarComponent'


export default (props: any) => {
  const { pathname } = useLocation()
  const history = useHistory()
  // const [pathname, setPathname] = useState('/welcome')

  console.log('reder')

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        {...props}
        logo={logo}
        title={'Sân Bóng'}
        colorWeak={false}
        contentWidth="Fluid"
        fixSiderbar={true}
        siderWidth={280}
        layout={'side'}
        navTheme="dark"
        location={{
          pathname
        }}
        route={{
          path: '/',
          routes: menuRoot
        }}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(item, dom) => {
          // if (item.isUrl || !item.path || pathname === item.path) {
          //   return dom
          // }
          return <Link to={`${item?.path}`}>{dom}</Link>
        }}
        // menuDataRender={() => }
        // itemRender={(route, params, routes, paths) => {
        //   const first = routes.indexOf(route) === 0
        //   return first ? (
        //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        //   ) : (
        //     <span>{route.breadcrumbName}</span>
        //   )
        // }}
        rightContentRender={() => (
          <div>
            <a>
              <QuestionCircleOutlined
                className="ml-2"
                style={{ fontSize: '20px', color: '#1890ff', margin: '0.8rem' }}
              />
            </a>
            <AvatarComponent />
            {/* <Avatar shape="circle" size="default" icon={<UserOutlined />} /> */}
          </div>
        )}
      >
        <Suspense fallback={<PageLoading />}>
          <ToastProvider autoDismiss autoDismissTimeout={2500}>
            <Switch>
              {navRoot.map((nav, index) => (
                <RouteCustomizeV2
                  exact={true}
                  key={index}
                  path={String(nav.path)}
                  component={nav.component}
                  isProtected={nav.isProtected}
                  resource={nav?.resource}
                />
              ))}
              <Route key={'notFoundPage'} render={() => <NoFoundPage />} />
            </Switch>
          </ToastProvider>
        </Suspense>
      </ProLayout>
      {/* <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        // settings={settings}
        onSettingChange={(changeSetting) => {
          // setSetting(changeSetting)
        }}
        disableUrlParams
      /> */}
    </div>
  )
}
