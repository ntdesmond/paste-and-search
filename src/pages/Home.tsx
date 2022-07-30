import { useEffect, useState } from 'react';
import SearchBlock from '../components/search/SearchBlock';
import ExternalURL from '../components/UI/ExternalURL';
import uploadImage from '../data/api/imgur';
import useClipboard from '../hooks/clipboard';

const Home = () => {
  const pastedData = useClipboard();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!(pastedData instanceof File)) {
      return;
    }
    setIsLoading(true);
    setImageUrl('');
    uploadImage(pastedData)
      .then(
        ({ data, success }) => {
          if (success) {
            setImageUrl(data.link);
          } else {
            setError((data as any).error || data);
          }
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError(err);
        },
      )
      .finally(() => setIsLoading(false));
  }, [pastedData]);

  if (pastedData instanceof File) {
    return (
      <div>
        {error && (
          <p>
            Error: <b>{error}</b>
          </p>
        )}
        {isLoading && <p>Uploading to imgur...</p>}
        {imageUrl && (
          <>
            <p>
              Your image on imgur: <ExternalURL href={imageUrl}>{imageUrl}</ExternalURL>
            </p>
            <SearchBlock imageUrl={imageUrl} />
          </>
        )}
      </div>
    );
  }

  return <p>Paste an image here!</p>;
};

export default Home;
