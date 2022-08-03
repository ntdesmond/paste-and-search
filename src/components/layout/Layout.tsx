import { ReactNode } from 'react';
import styled from 'styled-components';
import { FlexColumn } from './alignment/Flex';

const StyledLayout = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 2em;

  > * {
    max-width: 100%;
  }
`;

const Layout = (props: { children: ReactNode }) => (
  <StyledLayout as="main">{props.children}</StyledLayout>
);

export default Layout;
