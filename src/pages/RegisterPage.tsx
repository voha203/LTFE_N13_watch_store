import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../utils/validators'
import './AuthPage.css'

type FormErrors = {
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export default function RegisterPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [success, setSuccess] = useState(false)

    function validate(): FormErrors {
        const newErrors: FormErrors = {}

        if (!fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên'

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

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu'
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp'
        }

        return newErrors
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newErrors = validate()
        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            // Tuần 2: lưu tài khoản (AuthSlice + localStorage) ở đây
            console.log('Đăng ký với', fullName, email)
            setSuccess(true)
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <Link to="/" className="login-brand">
                    WatchStore
                </Link>
                <h1>Đăng ký</h1>
                <p className="login-subtitle">Tạo tài khoản để mua sắm dễ dàng hơn</p>

                {success && (
                    <p className="success-message">
                        Đăng ký thành công! <Link to="/login">Đăng nhập ngay</Link>
                    </p>
                )}

                <div className="field">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        autoComplete="name"
                        className={errors.fullName ? 'input-error' : ''}
                    />
                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                </div>

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
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        autoComplete="new-password"
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="field">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        autoComplete="new-password"
                        className={errors.confirmPassword ? 'input-error' : ''}
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}
                </div>

                <button type="submit" className="submit-button">
                    Đăng ký
                </button>

                <p className="auth-switch">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </form>
        </div>
    )
}