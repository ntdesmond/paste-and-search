import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUrlChecking from '../../../hooks/url';

type URLCallback = (url: string | null) => void;
type URLInputProps = {
  onUrlSubmit?: URLCallback;
  onUrlChange?: URLCallback;
  placeholder?: string;
};

const StyledInput = styled.input`
  padding: 0.2em;
  border: 1px solid #888;
  border-radius: 5px;
`;

const URLInput = (props: URLInputProps) => {
  const [text, setText] = useState('');
  const url = useUrlChecking(text);

  useEffect(() => {
    if (props.onUrlChange !== undefined) {
      props.onUrlChange(url);
    }
  }, [url]);

  return (
    <StyledInput
      type="text"
      onChange={(e) => {
        setText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Enter') {
          return;
        }
        if (props.onUrlSubmit !== undefined) {
          props.onUrlSubmit(url);
        }
      }}
      placeholder={props.placeholder}
    />
  );
};

export default URLInput;
