import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';

type UploaderProps = { id?: string; onFileChanged?: FileSelectedCallback; accept?: string };

const HiddenInput = styled.input`
  display: none;
`;

const LabelContent = styled.div`
  text-align: center;
  padding: 0.2em;
  border: 1px solid #888;
  border-radius: 5px;
  cursor: pointer;

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

const FileUploader = React.forwardRef<HTMLInputElement, UploaderProps>((props, ref) => {
  const [filename, setFilename] = useState<string>();

  const inputId = props.id === undefined ? 'file-input' : `${props.id}-file-input`;

  // Reset the file on first render
  useEffect(() => {
    if (props.onFileChanged !== undefined) {
      props.onFileChanged(null);
    }
  }, []);

  return (
    <label htmlFor={inputId}>
      <HiddenInput
        id={inputId}
        type="file"
        onChange={onChangeWrapper((file) => {
          setFilename(file?.name);
          if (props.onFileChanged !== undefined) {
            props.onFileChanged(file);
          }
        })}
        accept={props.accept}
        ref={ref}
      />
      <LabelContent>{filename || 'Upload a file'}</LabelContent>
    </label>
  );
});

export default FileUploader;
