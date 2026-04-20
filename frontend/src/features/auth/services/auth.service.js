import api from '@/lib/axios'

export const registerUserApi = async (payload) => {
    const { fullname, email, password, contact } = payload
    const res = await api.post('/auth/register', {
        fullname,
        email,
        password,
        contact,
        isSeller: false
    })
    return res.data
}

export const loginUserApi = async (payload) => {
    const { email, password } = payload
    const res = await api.post('/auth/login', {
        email,
        password
    })
    return res.data
}

export const getMeApi = async () => {
    const res = await api.get('/auth/get-me')
    return res.data
}