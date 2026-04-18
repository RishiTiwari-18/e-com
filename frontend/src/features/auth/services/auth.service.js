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