import React from 'react';
import styled from 'styled-components';
import InputBar from './InputBar';
import InputError from './InputError';

const StyledBlock = styled.div`
  width: 100%;
`;

const InputBlock = (props: { errorText?: string; children: React.ReactNode }) => (
  <StyledBlock>
    <InputBar>{props.children}</InputBar>
    <InputError>{props.errorText || ''}</InputError>
  </StyledBlock>
);

export default InputBlock;
