import z from "zod";

const createUrlDtoSchema = z.object({
    url: z.string().url(),
});

export type CreateUrlDto = z.infer<typeof createUrlDtoSchema>;

const createUrlReturnDtoSchema = z.object({
    url: z.string()
});

export type CreateUrlReturnDto = z.infer<typeof createUrlReturnDtoSchema>;