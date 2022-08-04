import axios from 'axios';
import { ImageUploadFunction } from './types';

const uploadImgBB: ImageUploadFunction = async (image: Blob) => {
  const form = new FormData();
  form.append('image', image);
  return axios
    .post(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMGBB_KEY}`, form)
    .then(
      ({ data }) => {
        if (data.success) {
          return { url: data.data.url };
        }
        return { error: data.error.message };
      },
      (error) => ({
        error: error.response
          ? error.response.data.error.message || error.response.data
          : error.message,
      }),
    );
};

export default uploadImgBB;
