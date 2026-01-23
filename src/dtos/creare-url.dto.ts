import { ApiProperty } from "@nestjs/swagger";
import z from "zod";

export const createUrlDtoSchema = z.object({
    url: z.string()
});

export type CreateUrlDto = z.infer<typeof createUrlDtoSchema>;

export type CreateUrlObject = {
    url: string;
    code: string;
    authorId?: string | null;
}

export class CreateUrlDtoBody {
    @ApiProperty({ example: 'https://google.com', description: 'URL to be shortened' })
    url: string;
}