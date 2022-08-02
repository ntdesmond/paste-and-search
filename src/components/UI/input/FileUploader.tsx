import React, { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';

type UploaderProps = { id?: string; onFileSelected?: FileSelectedCallback; accept?: string };

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

type FileSelectedCallback = (file: File) => void;

const onChangeWrapper = (handler: FileSelectedCallback) => {
  const wrapper: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files!;
    if (files.length > 0) {
      const file = files[0];
      handler(file);
    }
  };

  return wrapper;
};

const FileUploader = React.forwardRef<HTMLInputElement, UploaderProps>((props, ref) => {
  const [filename, setFilename] = useState('');

  const inputId = props.id === undefined ? 'file-input' : `${props.id}-file-input`;

  return (
    <label htmlFor={inputId}>
      <HiddenInput
        id={inputId}
        type="file"
        onChange={onChangeWrapper((file) => {
          setFilename(file.name);
          if (props.onFileSelected !== undefined) {
            props.onFileSelected(file);
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
