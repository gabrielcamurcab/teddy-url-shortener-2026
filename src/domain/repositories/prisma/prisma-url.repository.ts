import { Injectable } from "@nestjs/common";
import { UrlRepository } from "../url.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUrlDto, CreateUrlObject } from "src/dtos/creare-url.dto";
import { UpdateUrlDto } from "src/dtos/update-url.dto";
import { Url } from "../../entities/url.entity";

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUrlObject): Promise<void> {
        await this.prisma.url.create({
            data: {
                url: data.url,
                code: data.code,
                authorId: data.authorId
            },
        });
    }

    async findByShortUrl(shortUrl: string): Promise<Url | null> {
        const url = await this.prisma.url.findUnique({
            where: {
                code: shortUrl,
            },
        });

        return url;
    }

    async findAll(userId: string): Promise<Url[]> {
        const urls = await this.prisma.url.findMany({
            where: {
                authorId: userId,
            },
        });

        return urls;
    }

    async delete(userId: string, shortUrl: string): Promise<void> {
        await this.prisma.url.delete({
            where: {
                code: shortUrl,
                authorId: userId,
            },
        });
    }

    async update(userId: string, shortUrl: string, data: UpdateUrlDto): Promise<void> {
        await this.prisma.url.update({
            where: {
                code: shortUrl,
                authorId: userId,
            },
            data: {
                url: data.url,
            },
        });
    }

    async updateAccessCount(shortUrl: string): Promise<void> {
        await this.prisma.url.update({
            where: {
                code: shortUrl,
            },
            data: {
                accessCount: {
                    increment: 1,
                },
            },
        });
    }
}