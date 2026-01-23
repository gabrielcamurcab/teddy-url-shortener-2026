import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Redirect, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { GetUrlListReturnDto } from "src/dtos/get-url-list-return.dto";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("Urls")
@Controller()
export class GetUrlListController {
    constructor(private prisma: PrismaService) { }

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

        const urlsList = await this.prisma.url.findMany({
            where: {
                authorId,
            },
            select: {
                code: true,
                url: true,
                accessCount: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return {
            urls: urlsList,
        };
    }
}
