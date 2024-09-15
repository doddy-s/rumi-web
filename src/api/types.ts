export type BaseResDto = {
    statusCode: number,
    message: string
}

export type SimplePage = {
    maxPage: number
    currentPage: number
    hasNextPage: boolean
}