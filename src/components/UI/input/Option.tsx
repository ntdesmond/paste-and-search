import { ChangeEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1ch;
`;

const StyledRadio = styled.input`
  width: 1.5em;
  height: 1.5em;
  margin: 0;
  padding: 0;
`;

const onCheckedWrapper = (handler?: () => void) => {
  const wrapper: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked && handler !== undefined) {
      handler();
    }
  };

  return wrapper;
};

const Option = (props: {
  id?: string;
  name: string;
  value: string;
  onChecked?: () => void;
  children?: ReactNode;
  defaultChecked?: boolean;
}) => {
  const inputId = `${props.id || props.value}-option`;

  return (
    <StyledLabel htmlFor={inputId}>
      <StyledRadio
        id={inputId}
        type="radio"
        name={props.name}
        value={props.value}
        onChange={onCheckedWrapper(props.onChecked)}
        defaultChecked={props.defaultChecked || false}
      />
      <div>{props.children}</div>
    </StyledLabel>
  );
};

export default Option;
