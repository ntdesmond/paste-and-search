import { useEffect, useRef, useState } from 'react';
import { FlexColumn, FlexRow } from '../components/search/layout/alignment/Flex';
import SearchBlock from '../components/search/SearchBlock';
import ExternalURL from '../components/UI/ExternalURL';
import Option from '../components/UI/Option';
import { ImageUploadMethod } from '../data/api/images/types';
import useClipboard from '../hooks/clipboard';
import useImageUpload from '../hooks/imageUpload';
import useUrlChecking from '../hooks/url';

const Home = () => {
  const pastedData = useClipboard();
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [method, setMethod] = useState<ImageUploadMethod>('imgbb');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const imageUrl = useUrlChecking(url);
  const uploadImage = useImageUpload(method);

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
    setUrl('');
    uploadImage(file)
      .then(
        (response) => {
          if (response.error === undefined) {
            setUrl(response.url!);
          } else {
            setError(response.error);
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

  if (file === undefined && !imageUrl) {
    return (
      <div>
        <FlexColumn gap="1em">
          <div>Uploading method:</div>
          <Option name="method" value="imgbb" onChecked={() => setMethod('imgbb')} defaultChecked>
            ImgBB &mdash; the file will be autodeleted in 10 minutes
          </Option>
          <Option name="method" value="imgur" onChecked={() => setMethod('imgur')}>
            Imgur &mdash; the file will not be deleted, though this method may not work with some
            search engines
          </Option>
        </FlexColumn>
        <h1>Just paste an image!</h1>
        <p>or...</p>
        <FlexRow gap="1em">
          <input type="file" ref={fileInputRef} />
          <button type="button" onClick={() => setFile(fileInputRef.current?.files![0])}>
            Upload and search
          </button>
        </FlexRow>
        <p>or...</p>
        <FlexRow gap="1em">
          <input type="text" placeholder="Enter an image URL" ref={urlInputRef} />
          <button type="button" onClick={() => setUrl(urlInputRef.current?.value!)}>
            Search
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
      {isLoading && <p>Uploading the image...</p>}
      {imageUrl && (
        <>
          <p>
            Link to your image: <ExternalURL href={imageUrl}>{imageUrl}</ExternalURL>
          </p>
          <SearchBlock imageUrl={imageUrl} />
        </>
      )}
    </div>
  );
};

export default Home;
