import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { loginUser } from '../store/slice/AuthSlice'
import { isValidEmail } from '../utils/validators'
import '../styles/AuthPage.css'

type FormErrors = {
    email?: string
    password?: string
}

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const state = location.state as { from?: string; message?: string } | null
    const from = state?.from ?? '/'
    const notice = state?.message

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')

    function validate(): FormErrors {
        const newErrors: FormErrors = {}

        if (!email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Email không đúng định dạng'
        }

        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu'
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu tối thiểu 6 ký tự'
        }

        return newErrors
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newErrors = validate()
        setErrors(newErrors)
        setServerError('')
        if (Object.keys(newErrors).length > 0) return

        setSubmitting(true)
        try {
            await dispatch(loginUser({ email, password })).unwrap()
            navigate(from, { replace: true })
        } catch (err) {
            setServerError(typeof err === 'string' ? err : 'Đăng nhập thất bại')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <Link to="/" className="login-brand">
                    WatchStore
                </Link>
                <h1>Đăng nhập</h1>
                <p className="login-subtitle">
                    Tài khoản demo: demo@watchstore.com / 123456
                </p>

                {notice && <p className="notice-message">{notice}</p>}

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ban@example.com"
                        autoComplete="email"
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="field">
                    <label htmlFor="password">Mật khẩu</label>
                    <div className="password-wrapper">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            autoComplete="current-password"
                            className={errors.password ? 'input-error' : ''}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="auth-links-right">
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>

                {serverError && <p className="error server-error">{serverError}</p>}

                <button type="submit" className="submit-button" disabled={submitting}>
                    {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                <p className="auth-switch">
                    Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Về trang chủ
                </Link>
            </form>
        </div>
    )
}