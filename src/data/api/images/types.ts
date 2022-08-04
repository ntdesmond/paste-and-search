export type ImageUploadFunction = (image: Blob) => Promise<{ url?: string; error?: string }>;

export type ImageUploadMethod = 'imgbb' | 'imgur';
