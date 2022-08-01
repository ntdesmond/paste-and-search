import ImgurClient from 'imgur';
import { ImageUploadFunction } from './types';

const uploadImgur: ImageUploadFunction = async (image: File) => {
  const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });
  return client
    .upload({
      image: image as any,
    })
    .then((response) => {
      if (response.success) {
        return { url: response.data.link };
      }
      return { error: response.data as any };
    });
};

export default uploadImgur;
