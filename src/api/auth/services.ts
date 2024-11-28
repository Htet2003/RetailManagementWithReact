import type { LoginPayload } from './types'
import axios from 'axios'

const baseUrl = '/Authentication'

const login = async (credentials: LoginPayload) => {
    const request = await axios.post(`${baseUrl}/UserLogin?userName=${credentials.userName}&password=${credentials.password}`)
    return request.data
}

export default { login }