import { CreateUrlDto, CreateUrlObject } from "src/dtos/creare-url.dto";
import { UpdateUrlDto } from "src/dtos/update-url.dto";
import { Url } from "../entities/url.entity";

export abstract class UrlRepository {
    abstract create(data: CreateUrlObject): Promise<void>
    abstract findByShortUrl(shortUrl: string): Promise<Url | null>
    abstract findAll(userId: string): Promise<Url[]>
    abstract delete(userId: string, shortUrl: string): Promise<void>
    abstract update(userId: string, shortUrl: string, data: UpdateUrlDto): Promise<void>
    abstract updateAccessCount(shortUrl: string): Promise<void>
}