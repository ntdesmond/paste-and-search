import { useEffect, useRef, useState } from 'react';
import { FlexRow } from '../components/search/layout/alignment/Flex';
import SearchBlock from '../components/search/SearchBlock';
import ExternalURL from '../components/UI/ExternalURL';
import uploadImage from '../data/api/imgur';
import useClipboard from '../hooks/clipboard';

const Home = () => {
  const pastedData = useClipboard();
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Catch a file being pasted
  useEffect(() => {
    if (!(pastedData instanceof File)) {
      return;
    }
    setFile(pastedData);
  }, [pastedData]);

  // Upload an image to an image hosting
  useEffect(() => {
    if (file === undefined) {
      return;
    }
    setIsLoading(true);
    setImageUrl('');
    uploadImage(file)
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
  }, [file]);

  if (file === undefined) {
    return (
      <div>
        <p>Just paste an image!</p>
        <p>or...</p>
        <FlexRow gap="1em">
          <input type="file" ref={fileInputRef} />
          <button type="button" onClick={() => setFile(fileInputRef.current?.files![0])}>
            Upload and search
          </button>
        </FlexRow>
      </div>
    );
  }

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
};

export default Home;
