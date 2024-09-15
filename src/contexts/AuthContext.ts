import { createContext } from 'react'

export type AuthContext = {
  accessToken: string
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AuthContext = createContext<AuthContext>({
  accessToken: '',
  isAuthenticated: false,
  setIsAuthenticated: () => {}
})