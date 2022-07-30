import ImgurClient from 'imgur';

const uploadImage = async (image: File) => {
  const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });
  return client.upload({
    image: image as any,
  });
};

export default uploadImage;
