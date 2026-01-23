import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Redirect, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { UpdateUrlReturnDto } from "src/dtos/update-url-return.dto";
import { UpdateUrlDtoBody, updateUrlDtoSchema } from "src/dtos/update-url.dto";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("Urls")
@Controller()
export class UpdateUrlController {
    constructor(private prisma: PrismaService) { }

    @Patch("api/v1/urls/:code")
    @HttpCode(200)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update URL by code" })
    @ApiResponse({ status: 200, type: UpdateUrlReturnDto })
    @ApiResponse({ status: 404, description: "URL not found" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @UseGuards(JwtAuthGuard)
    async update(
        @Body(new ZodValidationPipe(updateUrlDtoSchema)) body: UpdateUrlDtoBody,
        @Param('code') code: string,
        @CurrentUser() user: UserPayload
    ) {
        const authorId = user.sub;

        const updatedUrl = await this.prisma.url.update({
            where: {
                code,
                authorId
            },
            data: {
                url: body.url
            }
        });

        if (!updatedUrl) {
            throw new NotFoundException("URL not found");
        }

        return {
            message: "URL updated successfully"
        };
    }
}
