import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user.decorator";
import { UserPayload } from "src/auth/jwt.strategy";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUrlDtoBody, createUrlDtoSchema } from "src/dtos/creare-url.dto";
import { OptionalJwtAuthGuard } from "src/auth/optional-jwt.guard";
import { env } from "../env";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateUrlReturnDto } from "src/dtos/creare-url-return.dto";
import { UrlRepository } from "src/domain/repositories/url.repository";

@ApiTags("Urls")
@Controller("/api/v1/urls")
export class CreateUrlController {
    constructor(private urlRepository: UrlRepository) { }

    @Post()
    @ApiBearerAuth()
    @HttpCode(201)
    @ApiOperation({ summary: "Shorten a new URL" })
    @ApiBody({ type: CreateUrlDtoBody })
    @ApiResponse({ status: 201, type: CreateUrlReturnDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @UseGuards(OptionalJwtAuthGuard)
    async create(
        @Body(new ZodValidationPipe(createUrlDtoSchema)) body: CreateUrlDtoBody,
        @CurrentUser() user?: UserPayload
    ): Promise<CreateUrlReturnDto> {
        const { url } = body;
        const authorId = user?.sub;

        const code = Math.random().toString(36).substring(2, 8);
        await this.urlRepository.create({
            url,
            code,
            authorId,
        });

        const shortUrl = `${env.SERVER_URL}/${code}`;

        return {
            url: shortUrl,
        };
    }
}