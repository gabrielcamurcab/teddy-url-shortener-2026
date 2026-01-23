import { Controller, Get, NotFoundException, Param, Redirect } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("Urls")
@Controller()
export class GetUrlController {
    constructor(private prisma: PrismaService) { }

    @Get("/:code")
    @Redirect()
    @ApiOperation({ summary: "Performs a 307 redirect to the original URL. Swagger UI cannot follow this redirect properly — access it directly in the browser." })
    @ApiResponse({ status: 307, description: "Temporary Redirect" })
    @ApiResponse({ status: 404, description: "URL not found" })
    async get(
        @Param('code') code: string,
    ) {
        const urlData = await this.prisma.url.findUnique({
            where: {
                code,
            },
        });

        if (!urlData) {
            throw new NotFoundException("URL not found");
        }

        await this.prisma.url.update({
            where: {
                code,
            },
            data: {
                accessCount: {
                    increment: 1,
                },
            },
        })

        return {
            url: urlData.url,
            statusCode: 307,
        };
    }
}
