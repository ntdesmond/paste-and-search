import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUrlChecking from '../../../hooks/url';

type URLInputProps = {
  onUrlSubmitted?: URLSubmitCallback;
  onUrlChanged?: URLChangeCallback;
  placeholder?: string;
};

const StyledInput = styled.input`
  padding: 0.2em;
  border: 1px solid #888;
  border-radius: 5px;
`;

type URLSubmitCallback = (url: string) => void;
type URLChangeCallback = (url: string | null) => void;

const URLInput = (props: URLInputProps) => {
  const [text, setText] = useState('');
  const url = useUrlChecking(text);

  useEffect(() => {
    if (props.onUrlChanged !== undefined) {
      props.onUrlChanged(url);
    }
  }, [url]);

  return (
    <StyledInput
      type="text"
      onChange={(e) => {
        setText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (props.onUrlSubmitted !== undefined && url !== null && e.key === 'Enter') {
          props.onUrlSubmitted(url);
        }
      }}
      placeholder={props.placeholder}
    />
  );
};

export default URLInput;
