import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '../store/slice/AuthSlice'

export default function ProtectedRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const location = useLocation()

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname, message: 'Vui lòng đăng nhập để tiếp tục' }}
            />
        )
    }

    return <Outlet />
}