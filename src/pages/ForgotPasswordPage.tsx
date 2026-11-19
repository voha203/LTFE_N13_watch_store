import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../utils/validators'
import '../styles/AuthPage.css'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [sent, setSent] = useState(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!email.trim()) {
            setError('Vui lòng nhập email')
            setSent(false)
        } else if (!isValidEmail(email)) {
            setError('Email không đúng định dạng')
            setSent(false)
        } else {
            setError('')
            setSent(true)
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <Link to="/" className="login-brand">
                    WatchStore
                </Link>
                <h1>Quên mật khẩu</h1>
                <p className="login-subtitle">
                    Nhập email, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
                </p>

                {sent && (
                    <p className="success-message">
                        Nếu email này đã đăng ký, hướng dẫn đặt lại mật khẩu đã được gửi.
                    </p>
                )}

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ban@example.com"
                        autoComplete="email"
                        className={error ? 'input-error' : ''}
                    />
                    {error && <p className="error">{error}</p>}
                </div>

                <button type="submit" className="submit-button">
                    Gửi hướng dẫn
                </button>

                <Link to="/login" className="back-home">
                    ← Quay lại đăng nhập
                </Link>
            </form>
        </div>
    )
}