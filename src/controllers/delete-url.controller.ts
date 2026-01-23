import { Controller, Delete, Get, HttpCode, NotFoundException, Param, Redirect, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { DeleteUrlReturnDto } from "src/dtos/delete-url-return.dto";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("Urls")
@Controller()
export class DeleteUrlController {
    constructor(private prisma: PrismaService) { }

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

        const droppedUrl = await this.prisma.url.delete({
            where: {
                code,
                authorId
            },
        });

        if (!droppedUrl) {
            throw new NotFoundException("URL not found");
        }

        return {
            message: "URL dropped successfully"
        };
    }
}
