import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import Login from '@/pages/Login'

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<div className="text-white p-8">Dashboard em breve</div>} />
    </Routes>
  )
}