import {z} from 'zod';

export const uploadedFileSchema = z
  .object({
    uri: z.string(),
    type: z.string().optional(),
    name: z.string().optional(),
    fileSize: z.number().optional(),
  })
  .nullable();

export type UploadedFile = z.infer<typeof uploadedFileSchema>;
