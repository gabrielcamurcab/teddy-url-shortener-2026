export class Url {
    id: string
    code: string
    originalUrl: string
    createdAt: Date
    updatedAt: Date
    ownerId?: string

    constructor(props: Url) {
        Object.assign(this, props)
    }
}