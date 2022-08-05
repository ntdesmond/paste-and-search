import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FlexColumn } from './components/layout/alignment/Flex';
import SectionHeading from './components/text/SectionHeading';
import SearchBlock from './components/search/SearchBlock';
import BulletPoint from './components/UI/BulletPoint';
import ExternalURL from './components/UI/ExternalURL';
import Option from './components/UI/input/Option';
import UploadMethodName from './components/UI/UploadMethodName';
import { ImageUploadMethod } from './data/api/images/types';
import usePasteEvent from './hooks/clipboard/pasteEvent';
import useImageUpload from './hooks/imageUpload';
import useResettableState from './hooks/resettableState';
import useUrlChecking from './hooks/url';
import MainHeading from './components/text/MainHeading';
import FileUploader from './components/UI/input/FileUploader';
import InputBlock from './components/UI/input/InputBlock';
import Button, { ResetButton } from './components/UI/input/Button';
import URLInput from './components/UI/input/URLInput';
import Loading from './components/UI/Loading';
import useClipboardReadAction from './hooks/clipboard/clipboardRead';
import InputError from './components/UI/input/InputError';

const PasteError = styled(InputError)`
  margin: -0.5em 0;
`;

const App = () => {
  const pastedData = usePasteEvent();
  const clipboardReadAction = useClipboardReadAction();
  const location = useLocation();
  const [file, setFile, clearFile] = useResettableState<Blob>();
  const [isLoading, setIsLoading, resetIsLoading] = useResettableState(false);
  const [error, setError, clearError] = useResettableState('');
  const [pasteError, setPasteError, clearPasteError] = useResettableState('');
  const [fileError, setFileError, clearFileError] = useResettableState('');
  const [urlError, setUrlError, clearUrlError] = useResettableState('');
  const [method, setMethod] = useState<ImageUploadMethod>('imgbb');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputtedURL, setInputtedURL] = useState<string | null>(null);
  const imageUrl = useUrlChecking(new URLSearchParams(location.search).get('url') || '');
  const uploadImage = useImageUpload(method);
  const navigate = useNavigate();

  const setUrl = (url: string) => navigate(`?url=${encodeURIComponent(url)}`);
  const reset = () => {
    navigate('/');
    clearFile();
    resetIsLoading();
    clearError();
    clearFileError();
    clearUrlError();
  };

  // Drop invalid URLs
  useEffect(() => {
    if (imageUrl === null) {
      navigate('/');
    }
  }, [imageUrl]);

  // Catch a file being pasted
  useEffect(() => {
    if (pastedData === null || pastedData === undefined) {
      return;
    }

    clearPasteError();
    if (!(pastedData instanceof File)) {
      setPasteError('No images found in the clipboard.');
      return;
    }
    setFile(pastedData);
  }, [pastedData]);

  // Upload an image to an image hosting
  useEffect(() => {
    if (file === undefined) {
      return;
    }
    navigate('/');
    setIsLoading(true);
    uploadImage(file)
      .then(
        (response) => {
          if (response.error === undefined) {
            setUrl(response.url!);
            clearFile();
          } else {
            setError(response.error);
          }
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError(JSON.stringify(err));
        },
      )
      .finally(() => setIsLoading(false));
  }, [file]);

  // Input errors clearing
  useEffect(() => {
    if (selectedFile !== null) {
      clearFileError();
    }
  }, [selectedFile]);

  useEffect(() => {
    if (inputtedURL !== null) {
      clearUrlError();
    }
  }, [inputtedURL]);

  // Button actions
  const onPasteButtonClick = () => {
    if (clipboardReadAction === null) {
      return;
    }

    clearPasteError();
    clipboardReadAction().then(
      (blob) => setFile(blob),
      (err: Error) => setPasteError(err.message),
    );
  };

  const onFileSubmit = () => {
    if (selectedFile === null) {
      setFileError('Select a file first');
      return;
    }
    clearFileError();
    setFile(selectedFile);
  };

  const onUrlSubmit = () => {
    if (inputtedURL === null) {
      setUrlError('Not a valid URL');
      return;
    }
    clearUrlError();
    setUrl(inputtedURL);
  };

  if (file === undefined && !imageUrl) {
    return (
      <>
        <FlexColumn gap="1em">
          <SectionHeading>Uploading method:</SectionHeading>
          <Option
            name="method"
            value="imgbb"
            onChecked={() => setMethod('imgbb')}
            defaultChecked={method === 'imgbb'}
          >
            <UploadMethodName>ImgBB</UploadMethodName>
            <BulletPoint>Uploaded files will be autodeleted in 10 minutes</BulletPoint>
            <BulletPoint>Supports WEBP images</BulletPoint>
          </Option>
          <Option
            name="method"
            value="imgur"
            onChecked={() => setMethod('imgur')}
            defaultChecked={method === 'imgur'}
          >
            <UploadMethodName>Imgur</UploadMethodName>
            <BulletPoint>The file will not be deleted (hopefully)</BulletPoint>
            <BulletPoint>
              May not work with some search engines (see{' '}
              <ExternalURL href="https://saucenao.blogspot.com/2021/04/recent-events.html">
                this post
              </ExternalURL>
              )
            </BulletPoint>
          </Option>
        </FlexColumn>
        <FlexColumn gap="1em" align="center">
          <MainHeading>Just paste an image!</MainHeading>
          {clipboardReadAction !== null && (
            <>
              <div>or...</div>
              <Button onClick={onPasteButtonClick}>Read from clipboard</Button>
            </>
          )}
          <PasteError>{pasteError}</PasteError>
          <div>or...</div>
          <InputBlock errorText={fileError}>
            <FileUploader accept="image/*" onFileChanged={setSelectedFile} />
            <Button type="button" onClick={onFileSubmit}>
              Search
            </Button>
          </InputBlock>
          <div>or...</div>
          <InputBlock errorText={urlError}>
            <URLInput
              placeholder="Enter an image URL"
              onUrlSubmit={onUrlSubmit}
              onUrlChange={setInputtedURL}
            />
            <Button type="button" onClick={onUrlSubmit}>
              Search
            </Button>
          </InputBlock>
        </FlexColumn>
      </>
    );
  }

  return (
    <FlexColumn gap="1em" align="flex-start">
      <ResetButton type="button" onClick={reset}>
        Reset
      </ResetButton>
      {error && (
        <section>
          <SectionHeading>Error:</SectionHeading>
          <code>{error}</code>
        </section>
      )}
      {isLoading && <Loading>Uploading the image...</Loading>}
      {imageUrl && (
        <FlexColumn gap="2em">
          <section>
            <SectionHeading>Link to your image:</SectionHeading>
            <ExternalURL href={imageUrl}>{imageUrl}</ExternalURL>
          </section>
          <SearchBlock imageUrl={encodeURIComponent(imageUrl)} />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default App;
