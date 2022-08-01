export type ImageUploadFunction = (image: File) => Promise<{ url?: string; error?: string }>;

export type ImageUploadMethod = 'imgbb' | 'imgur';
