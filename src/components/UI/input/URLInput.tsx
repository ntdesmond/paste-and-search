import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUrlChecking from '../../../hooks/url';

type URLInputProps = { onUrlEntered?: URLEnteredCallback; placeholder?: string };

const StyledInput = styled.input`
  padding: 0.2em;
  border: 1px solid #888;
  border-radius: 5px;
`;

type URLEnteredCallback = (text: string) => void;

const URLInput = React.forwardRef<HTMLInputElement, URLInputProps>((props, ref) => {
  const [text, setText] = useState('');
  const url = useUrlChecking(text);

  useEffect(() => {
    if (url !== null && props.onUrlEntered !== undefined) {
      props.onUrlEntered(url);
    }
  }, [url]);

  return (
    <StyledInput
      type="text"
      onChange={(e) => {
        setText(e.target.value);
      }}
      placeholder={props.placeholder}
      ref={ref}
    />
  );
});

export default URLInput;
