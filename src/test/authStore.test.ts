import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/store/authStore'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: false, user: null })
  })

  it('deve iniciar sem usuario autenticado', () => {
    const { isAuthenticated, user } = useAuthStore.getState()
    expect(isAuthenticated).toBe(false)
    expect(user).toBeNull()
  })

  it('deve autenticar o usuario ao chamar login', () => {
    const { login } = useAuthStore.getState()
    login({ name: 'Alan Silva', email: 'user@novapay.com' })

    const { isAuthenticated, user } = useAuthStore.getState()
    expect(isAuthenticated).toBe(true)
    expect(user?.email).toBe('user@novapay.com')
  })

  it('deve desautenticar ao chamar logout', () => {
    const { login, logout } = useAuthStore.getState()
    login({ name: 'Alan Silva', email: 'user@novapay.com' })
    logout()

    const { isAuthenticated, user } = useAuthStore.getState()
    expect(isAuthenticated).toBe(false)
    expect(user).toBeNull()
  })
})