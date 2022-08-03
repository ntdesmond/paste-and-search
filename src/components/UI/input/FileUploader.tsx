import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

type UploaderProps = { onFileChanged?: FileSelectedCallback; accept?: string };

const HiddenInput = styled.input`
  display: none;
`;

const StyledUploader = styled(Button)`
  background-color: #8881;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    background-color: #8882;
  }
`;

type FileSelectedCallback = (file: File | null) => void;

const onChangeWrapper = (handler: FileSelectedCallback) => {
  const wrapper: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files!;
    const file = files[0] || null;
    handler(file);
  };

  return wrapper;
};

const FileUploader = (props: UploaderProps) => {
  const [filename, setFilename] = useState<string>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Reset the file on first render
  useEffect(() => {
    if (props.onFileChanged !== undefined) {
      props.onFileChanged(null);
    }
  }, []);

  return (
    <StyledUploader type="button" onClick={() => inputRef.current?.click()}>
      <HiddenInput
        type="file"
        onChange={onChangeWrapper((file) => {
          setFilename(file?.name);
          if (props.onFileChanged !== undefined) {
            props.onFileChanged(file);
          }
        })}
        accept={props.accept}
        ref={inputRef}
      />
      {filename || 'Upload a file'}
    </StyledUploader>
  );
};

export default FileUploader;
