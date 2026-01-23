import { Controller, Delete, Get, HttpCode, NotFoundException, Param, Redirect, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { UrlRepository } from "src/domain/repositories/url.repository";
import { DeleteUrlReturnDto } from "src/dtos/delete-url-return.dto";

@ApiTags("Urls")
@Controller()
export class DeleteUrlController {
    constructor(private urlRepository: UrlRepository) { }

    @Delete("api/v1/urls/:code")
    @HttpCode(200)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete URL by code" })
    @ApiResponse({ status: 200, type: DeleteUrlReturnDto })
    @ApiResponse({ status: 404, description: "URL not found" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('code') code: string,
        @CurrentUser() user: UserPayload
    ) {
        const authorId = user.sub;

        if (!authorId) {
            throw new UnauthorizedException("Unauthorized");
        }

        await this.urlRepository.delete(authorId, code);

        return {
            message: "URL dropped successfully"
        };
    }
}
