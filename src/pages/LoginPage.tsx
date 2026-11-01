// import { useState } from 'react'
// import './LoginPage.css'
//
// export default function LoginPage() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [errors, setErrors] = useState({})
//
//     function validate() {
//         const newErrors = {}
//         if (!email.trim()) newErrors.email = 'Vui lòng nhập email'
//         if (!password) newErrors.password = 'Vui lòng nhập mật khẩu'
//         return newErrors
//     }
//
//     function handleSubmit(e) {
//         e.preventDefault()
//         const newErrors = validate()
//         setErrors(newErrors)
//         if (Object.keys(newErrors).length === 0) {
//             // Tuần 2: gọi login() từ AuthContext ở đây
//             console.log('Đăng nhập với', email)
//         }
//     }
//
//     return (
//         <div className="login-page">
//             <form className="login-form" onSubmit={handleSubmit} noValidate>
//                 <h1>Đăng nhập</h1>
//
//                 <label htmlFor="email">Email</label>
//                 <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="ban@example.com"
//                 />
//                 {errors.email && <p className="error">{errors.email}</p>}
//
//                 <label htmlFor="password">Mật khẩu</label>
//                 <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {errors.password && <p className="error">{errors.password}</p>}
//
//                 <button type="submit">Đăng nhập</button>
//             </form>
//         </div>
//     )
// }