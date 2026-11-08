import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import "../styles/LoginPage.css";
type FormErrors = {
    email?: string
    password?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})

    function validate(): FormErrors {
        const newErrors: FormErrors = {}

        if (!email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!EMAIL_PATTERN.test(email)) {
            newErrors.email = 'Email không đúng định dạng'
        }

        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu'
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu tối thiểu 6 ký tự'
        }

        return newErrors
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newErrors = validate()
        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            // Tuần 2: dispatch hành động đăng nhập từ AuthSlice ở đây
            console.log('Đăng nhập với', email)
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <Link to="/" className="login-brand">
                    WatchStore
                </Link>
                <h1>Đăng nhập</h1>
                <p className="login-subtitle">Chào mừng bạn quay lại cửa hàng đồng hồ</p>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ban@example.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && (
                        <p id="email-error" className="error">
                            {errors.email}
                        </p>
                    )}
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
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? 'password-error' : undefined}
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
                    {errors.password && (
                        <p id="password-error" className="error">
                            {errors.password}
                        </p>
                    )}
                </div>

                <button type="submit" className="submit-button">
                    Đăng nhập
                </button>

                <Link to="/" className="back-home">
                    ← Về trang chủ
                </Link>
            </form>
        </div>
    )
}