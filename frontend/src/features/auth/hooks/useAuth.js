import { useDispatch } from "react-redux"
import { setLoading, setUser } from "../slices/auth.slice"
import { getMeApi, loginUserApi, registerUserApi } from "../services/auth.service"

const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async (payload) => {
        try {
            dispatch(setLoading(true))
            const res = await registerUserApi(payload)
            dispatch(setUser(res.user))
            return res
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async (payload) => {
        try {
            dispatch(setLoading(true))
            const res = await loginUserApi(payload)
            dispatch(setUser(res.user))
            return res
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))
            const res = await getMeApi()
            dispatch(setUser(res.user))
            return res
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false))
        }
    }


    return { handleRegister, handleLogin, handleGetMe }
}

export default useAuth