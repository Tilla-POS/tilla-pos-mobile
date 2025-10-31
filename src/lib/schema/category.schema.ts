import {z} from 'zod';
import {uploadedFileSchema} from './file-upload.schema';

export const createCategorySchema = z.object({
  image: uploadedFileSchema.refine(
    file => file !== null,
    'Product image is required',
  ),
  name: z.string('Name is required').min(1, 'Name is required'),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
