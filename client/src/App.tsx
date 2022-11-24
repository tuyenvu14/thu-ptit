import { Route, BrowserRouter, Switch } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import BasicLayout from './layout/BasicLayout'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route key={Math.random()} path="/auth" component={AuthLayout} />
        <Route key={Math.random()} path="/" component={BasicLayout} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
