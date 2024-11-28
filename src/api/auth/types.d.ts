export type LoginPayload = {
    userName: string
    password: string
}

export type LoginResponse = {
    data: LoginData
}

export type LoginData = {
    result: string
}