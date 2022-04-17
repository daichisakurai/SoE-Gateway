import React, { createContext, useContext, useState } from 'react'
import * as Type from '../models/Type'
import AuthUser from '../models/auth'

const user = sessionStorage.getItem('userId') ? { userId: sessionStorage.getItem('userId') } : null

const AuthUserContext = createContext<AuthUser | null>(user)
const AuthOperationContext = createContext<Type.OperationType>({
  login: () => console.error('Providerが設定されていません'),
  logout: () => console.error('Providerが設定されていません')
})

const AuthUserProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(user)

  const login = async (userId: string) => {
    sessionStorage.setItem('userId', userId)
    setAuthUser({ userId })
  }

  const logout = async () => {
    sessionStorage.clear()
    setAuthUser(null)
  }

  return (
    <AuthOperationContext.Provider value={{ login, logout }}>
      <AuthUserContext.Provider value={authUser}>{children}</AuthUserContext.Provider>
    </AuthOperationContext.Provider>
  )
}

export const useAuthUser = (): AuthUser => useContext(AuthUserContext)
export const useLogin = (): ((userId: string) => void) => useContext(AuthOperationContext).login
export const useLogout = (): (() => void) => useContext(AuthOperationContext).logout

export default AuthUserProvider
