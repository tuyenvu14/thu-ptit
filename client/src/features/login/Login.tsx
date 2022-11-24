import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router'
import { MESSAGE_CREATED_SUCCESS } from '../../constants'
import { useNotification } from '../../hook/useNotification'
import { useLoginAdminMutation } from './api'
import { selectAccessToken } from './authSlice'
import LoginForm from './LoginForm'

const Login = () => {
  const history = useHistory()
  const { pathname, search } = useLocation()

  const [login, { isLoading, isSuccess, isError }] = useLoginAdminMutation()

  const obj = new URLSearchParams(search)

  const redirectPathName = obj.get('redirect')

  useEffect(() => {
    if (isSuccess) {
      history.push(redirectPathName ? String(redirectPathName) : '/')
    }
  }, [isSuccess])

  // useNotification(isSuccess, isError, 'Chào mừng !')

  const accessToken = useSelector(selectAccessToken)

  if (accessToken) {
    return (
      <Redirect to={`${redirectPathName ? String(redirectPathName) : '/'}`} />
    )
  }

  const handleSubmitForm = (data: any) => {
    login(data)
  }

  return <LoginForm handleSubmitForm={handleSubmitForm} />
}

export default Login
