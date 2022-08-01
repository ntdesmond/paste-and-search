import { ImageUploadFunction, ImageUploadMethod } from '../data/api/images/types';
import uploadImgBB from '../data/api/images/imgbb';
import uploadImgur from '../data/api/images/imgur';

const useImageUpload: (method: ImageUploadMethod) => ImageUploadFunction = (method) => {
  switch (method) {
    case 'imgur':
      return uploadImgur;
    default:
      return uploadImgBB;
  }
};

export default useImageUpload;
