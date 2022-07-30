import { useEffect, useState } from 'react';
import uploadImage from '../data/api/imgur';
import useClipboard from '../hooks/clipboard';

const Home = () => {
  const pastedData = useClipboard();
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!(pastedData instanceof File)) {
      return;
    }
    setIsLoading(true);
    uploadImage(pastedData)
      .then(
        ({ data, success }) => {
          if (success) {
            setImageURL(data.link);
          } else {
            setError((data as any).error || data);
          }
        },
        // eslint-disable-next-line no-console
        (err) => console.log(err),
      )
      .finally(() => setIsLoading(false));
  }, [pastedData]);

  if (pastedData instanceof File) {
    return (
      <div>
        <p>You pasted a file of type {pastedData.type}</p>
        {error && (
          <p>
            Error: <b>{error}</b>
          </p>
        )}
        {isLoading && <p>Uploading to imgur....</p>}
        {imageURL && (
          <p>
            Your image on imgur:{' '}
            <a href={imageURL} target="_blank" rel="noreferrer">
              {imageURL}
            </a>
          </p>
        )}
      </div>
    );
  }

  return <p>Paste an image here!</p>;
};

export default Home;
