import { useDispatch } from "react-redux"
import { setLoading, setUser } from "../slices/auth.slice"
import { registerUserApi } from "../services/auth.service"

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

    return { handleRegister }
}

export default useAuth