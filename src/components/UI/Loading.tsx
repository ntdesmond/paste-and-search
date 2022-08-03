import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FlexColumn, FlexRow } from '../layout/alignment/Flex';

const Rotating = (initialAngle: number) => keyframes`
0% {
  transform: rotate(${initialAngle}deg);
}
100% {
  transform: rotate(${initialAngle + 360}deg);
}
`;

const SpinnerSegment = styled.div<{ index: number }>`
  width: 10%;
  height: 10%;
  border-radius: 50%;
  background-color: #888;
  position: absolute;
  transform-origin: 50% 500%;
  animation: ${(p) => Rotating(p.index * 15)} 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation-delay: ${(p) => p.index * -0.05}s;
`;

const Spinner = styled(FlexRow)`
  transform: rotate(-37.5deg);
  position: relative;
  justify-content: center;
  align-items: flex-start;
  width: 10em;
  height: 10em;
`;

const StyledLoading = styled(FlexColumn)`
  gap: 1em;
  align-items: center;
  align-self: center;
`;

const Loading = (props: { children?: React.ReactNode }) => (
  <StyledLoading>
    <Spinner>
      {[...Array(5).keys()].map((i) => (
        <SpinnerSegment key={i} index={i} />
      ))}
    </Spinner>
    {props.children}
  </StyledLoading>
);

export default Loading;
