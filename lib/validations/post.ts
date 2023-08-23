import * as z from 'zod';

export const PostValidation = z.object({
  cafeName: z.string().nonempty({ message: 'required' }),
  cafeUrl: z.string().url({ message: 'invalid url' }).optional().or(z.literal('')),
  cafeLocation: z.string(),
  cafeImage: z.string().url({ message: 'invalid url' }).optional().or(z.literal('')),
  wifi: z.string().nonempty({ message: 'please select one' }), // free or password or non
  bathroom: z.string().nonempty({ message: 'please select one' }), // yes or not
  outlet: z.string().nonempty({ message: 'please select one' }), // yes or not
  comment: z.string(),
  accountId: z.string(),
})

