export class Url {
    code: string
    url: string
    accessCount: number
    createdAt: Date
    updatedAt: Date | null
    authorId?: string | null

    constructor(props: Url) {
        Object.assign(this, props)
    }
}   