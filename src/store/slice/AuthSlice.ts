import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from '../../types/User'
import type { RootState } from '../Store'
import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage,
} from '../../utils/storage'

interface StoredUser extends User {
    password: string
}

interface AuthState {
    user: User | null
}

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

const DEMO_USER: StoredUser = {
    id: 1,
    fullName: 'Khách Demo',
    email: 'demo@watchstore.com',
    password: '123456',
}

function getUsers(): StoredUser[] {
    const users = loadFromStorage<StoredUser[]>(USERS_KEY, [])

    const demoIndex = users.findIndex(
        (u) => u.email.trim().toLowerCase() === DEMO_USER.email.toLowerCase()
    )

    if (demoIndex === -1) {
        const updated = [DEMO_USER, ...users]
        saveToStorage(USERS_KEY, updated)
        return updated
    }

    const updated = [...users]
    updated[demoIndex] = DEMO_USER

    saveToStorage(USERS_KEY, updated)
    return updated
}

const initialState: AuthState = {
    user: loadFromStorage<User | null>(CURRENT_USER_KEY, null),
}

// Giả lập độ trễ của máy chủ
const wait = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms))

export const registerUser = createAsyncThunk<
    void,
    { fullName: string; email: string; password: string },
    { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
    await wait(600)
    const users = getUsers()
    const exists = users.some(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
    )
    if (exists) return rejectWithValue('Email này đã được đăng ký')

    const newUser: StoredUser = { id: Date.now(), ...data }
    saveToStorage(USERS_KEY, [...users, newUser])
})

export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
    await wait(600)
    const users = getUsers()
    const found = users.find(
        (u) =>
            u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return rejectWithValue('Email hoặc mật khẩu không đúng')

    const user: User = {
        id: found.id,
        fullName: found.fullName,
        email: found.email,
    }
    saveToStorage(CURRENT_USER_KEY, user)
    return user
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            removeFromStorage(CURRENT_USER_KEY)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.user !== null