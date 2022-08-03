import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledAnchor = styled.a`
  word-wrap: anywhere;
`;

const ExternalURL = (props: { children: ReactNode; href: string }) => (
  <StyledAnchor href={props.href} target="_blank" rel="noreferrer">
    {props.children}
  </StyledAnchor>
);

export default ExternalURL;
