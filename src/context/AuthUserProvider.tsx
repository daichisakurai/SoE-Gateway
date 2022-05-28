import React, { createContext, useContext, useState } from 'react'
import * as Type from '../models/Type'
import AuthUser from '../models/auth'

/**
 * user_id
 */
const user = sessionStorage.getItem('userId') ? { userId: sessionStorage.getItem('userId') } : null

/**
 * ユーザ情報のコンテキスト
 */
const AuthUserContext = createContext<AuthUser | null>(user)

/**
 * ユーザ操作のコンテキスト
 */
const AuthOperationContext = createContext<Type.OperationType>({
  login: () => console.error('Providerが設定されていません'),
  logout: () => console.error('Providerが設定されていません')
})

/**
 * 認証プロバイダ
 * @param {React.ReactNode} children 子要素
 * @returns 認証プロバイダ
 */
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

/**
 * ユーザ情報のコンテキスト
 * @returns ユーザ情報のコンテキスト
 */
export const useAuthUser = (): AuthUser => useContext(AuthUserContext)

/**
 * ログイン処理
 * @returns ログイン処理関数
 */
export const useLogin = (): ((userId: string) => void) => useContext(AuthOperationContext).login

/**
 * ログアウト処理
 * @returns ログアウト処理関数
 */
export const useLogout = (): (() => void) => useContext(AuthOperationContext).logout

export default AuthUserProvider
