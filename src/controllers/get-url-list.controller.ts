import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Redirect, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { UrlRepository } from "src/domain/repositories/url.repository";
import { GetUrlListReturnDto } from "src/dtos/get-url-list-return.dto";

@ApiTags("Urls")
@Controller()
export class GetUrlListController {
    constructor(private urlRepository: UrlRepository) { }

    @Get("/api/v1/urls")
    @ApiBearerAuth()
    @HttpCode(200)
    @ApiOperation({ summary: "Get URLs list by logged user" })
    @ApiResponse({ status: 200, type: GetUrlListReturnDto, isArray: true })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @UseGuards(JwtAuthGuard)
    async get(
        @CurrentUser() user: UserPayload

    ) {
        const authorId = user.sub;

        const urlsList = await this.urlRepository.findAll(authorId);

        return {
            urls: urlsList,
        };
    }
}
