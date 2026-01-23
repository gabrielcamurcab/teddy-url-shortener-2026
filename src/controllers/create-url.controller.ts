import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user.decorator";
import { UserPayload } from "src/auth/jwt.strategy";
import { ApiTags } from "@nestjs/swagger";
import { CreateUrlDto, CreateUrlReturnDto } from "../dtos/create-url.controller";
import { PrismaService } from "../prisma/prisma.service";
import { env } from "process";
import { OptionalJwtAuthGuard } from "src/auth/optional-jwt.guard";

@ApiTags("Urls")
@Controller("/api/v1/urls")
export class CreateUrlController {
    constructor(private prisma: PrismaService) { }

    @Post()
    @UseGuards(OptionalJwtAuthGuard)
    async create(
        @Body() body: CreateUrlDto,
        @CurrentUser() user?: UserPayload
    ): Promise<CreateUrlReturnDto> {
        const { url } = body;
        const authorId = user?.sub;

        console.log(user);

        const code = Math.random().toString(36).substring(2, 8);
        const urlCreated = await this.prisma.url.create({
            data: {
                url: url,
                code: code,
                authorId: authorId,
            },
        });

        const shortUrl = `${env.SERVER_URL}/${urlCreated.code}`;

        return {
            url: shortUrl,
        };
    }
}