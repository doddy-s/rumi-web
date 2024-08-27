import { BaseResDto } from "@api/types"

export type RegisterReqDto = {
    username: string,
    email: string,
    picture: string
    password: string
}

export type RegisterResDto = BaseResDto & {
    data: {
        username: string,
        email: string,
        picture: string
    }
}

export type LoginReqDto = {
    username: string,
    password: string
}

export type LoginResDto = BaseResDto & {
    data: {
        userId: number,
        accessToken: string,
        refreshToken: string
    }
}