import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '../store/slice/AuthSlice'

export function useRequireAuth() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const navigate = useNavigate()
    const location = useLocation()

    return function requireAuth(): boolean {
        if (isAuthenticated) return true
        navigate('/login', {
            state: { from: location.pathname, message: 'Vui lòng đăng nhập để mua hàng' },
        })
        return false
    }
}