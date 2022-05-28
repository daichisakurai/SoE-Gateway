import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AuthUserProvider, { useAuthUser } from './context/AuthUserProvider'
import Login from './pages/Login'
import Top from './pages/Top'

/**
 * 非認証時のルーティング
 * @param {RouteProps} param0 ルーティングプロパティ
 * @returns 非認証時のルーティング
 */
const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser !== null
  if (isAuthenticated) {
    return <Redirect to={'/'} />
  } else {
    return <Route {...props} />
  }
}

/**
 * 認証時のルーティング
 * @param {RouteProps} param0 ルーティングプロパティ
 * @returns 認証時のルーティング
 */
const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser !== null
  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    return <Redirect to={{ pathname: '/login', state: { from: props.location?.pathname } }} />
  }
}

/**
 * MUIテーマ
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#9c27b0'
    }
  }
})

/**
 * ページをrender
 * @returns ページ
 */
const App: React.VFC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthUserProvider>
          <Router>
            <Switch>
              <UnAuthRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Top} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </AuthUserProvider>
      </ThemeProvider>
    </>
  )
}

ReactDOM.render(<App></App>, document.getElementById('app'))
